import { useEffect, useRef, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/dist/types/types';
import { createClient, type Room } from '@liveblocks/client';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import * as Y from 'yjs';
import { UndoManager } from 'yjs';
import { ExcalidrawBinding } from 'y-excalidraw';
import * as styles from './index.css';

interface WhiteboardProps {
  roomId: string;
  className?: string;
}

// Initialize Liveblocks client once (using public key from environment)
// For unauthenticated access, we use the public API key
const publicApiKey = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY;

if (!publicApiKey || !publicApiKey.startsWith('pk_')) {
  console.error(
    'Liveblocks public key is missing or invalid. Please set VITE_LIVEBLOCKS_PUBLIC_KEY environment variable with a key starting with "pk_"'
  );
}

const client = publicApiKey && publicApiKey.startsWith('pk_')
  ? createClient({
      publicApiKey,
    })
  : null;

function Whiteboard({ roomId, className }: WhiteboardProps) {
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const excalidrawRef = useRef<HTMLDivElement>(null);
  const yDocRef = useRef<Y.Doc>(new Y.Doc());
  const providerRef = useRef<LiveblocksYjsProvider | null>(null);
  const roomRef = useRef<Room | null>(null);
  const leaveRef = useRef<(() => void) | null>(null);
  const bindingRef = useRef<ExcalidrawBinding | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!roomId || !client) {
      return;
    }

    // Enter the room (will be created automatically if it doesn't exist)
    const { room, leave } = client.enterRoom(roomId, {
      initialPresence: {},
      initialStorage: {},
    });

    roomRef.current = room;
    leaveRef.current = leave;

    // Create Yjs provider for Liveblocks
    const yjsProvider = new LiveblocksYjsProvider(room, yDocRef.current);
    providerRef.current = yjsProvider;

    // Wait for sync before showing the whiteboard
    yjsProvider.on('sync', () => {
      setIsLoading(false);
    });

    // Cleanup on unmount
    return () => {
      if (providerRef.current) {
        providerRef.current.destroy();
        providerRef.current = null;
      }
      if (leaveRef.current) {
        leaveRef.current();
        leaveRef.current = null;
      }
      roomRef.current = null;
    };
  }, [roomId]);

  useEffect(() => {
    if (!excalidrawAPIRef.current || !yDocRef.current || !providerRef.current || isLoading) {
      return;
    }

    const yElements = yDocRef.current.getArray<Y.Map<unknown>>('elements');
    const yAssets = yDocRef.current.getMap('assets');
    const awareness = providerRef.current.awareness;
    const excalidrawDom = excalidrawRef.current;

    if (!awareness || !excalidrawDom) {
      return;
    }

    // Create UndoManager for collaborative undo/redo
    const undoManager = new UndoManager(yElements, {
      trackedOrigins: new Set([]),
      captureTimeout: 500,
      doc: yDocRef.current,
      ignoreRemoteMapChanges: false,
    });

    // Create ExcalidrawBinding to sync Excalidraw with Yjs
    const binding = new ExcalidrawBinding(
      yElements,
      yAssets,
      excalidrawAPIRef.current,
      awareness,
      {
        excalidrawDom,
        undoManager,
      }
    );

    bindingRef.current = binding;

    // Cleanup on unmount
    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
      undoManager.destroy();
    };
  }, [isLoading]);

  if (!client) {
    return (
      <div className={className}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>
            Liveblocks is not configured. Please set VITE_LIVEBLOCKS_PUBLIC_KEY environment variable.
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Loading whiteboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={styles.whiteboardContainer} ref={excalidrawRef}>
        <Excalidraw
          excalidrawAPI={(api) => {
            excalidrawAPIRef.current = api;
          }}
          onPointerUpdate={(payload) => {
            // Update presence with cursor position
            if (roomRef.current) {
              roomRef.current.updatePresence({
                cursor: payload.pointer ? { x: payload.pointer.x, y: payload.pointer.y } : null,
              });
            }
          }}
        />
      </div>
    </div>
  );
}

export default Whiteboard;

