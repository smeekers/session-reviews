import '@excalidraw/excalidraw/index.css';
import { useEffect, useRef, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Excalidraw types are not fully exported, but these work at runtime
import type { ExcalidrawElement, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { createClient, type Room } from '@liveblocks/client';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import * as Y from 'yjs';
import { UndoManager } from 'yjs';
import { ExcalidrawBinding, yjsToExcalidraw } from 'y-excalidraw';
import Loading from '../loading';
import * as styles from './index.css';

interface WhiteboardProps {
  roomId: string;
  className?: string;
}

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY,
});

function Whiteboard({ roomId, className }: WhiteboardProps) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialElements, setInitialElements] = useState<readonly ExcalidrawElement[]>([]);

  const excalidrawRef = useRef<HTMLDivElement>(null);
  const yDocRef = useRef<Y.Doc>(new Y.Doc());
  const providerRef = useRef<LiveblocksYjsProvider | null>(null);
  const roomRef = useRef<Room | null>(null);
  const leaveRef = useRef<(() => void) | null>(null);
  const bindingRef = useRef<ExcalidrawBinding | null>(null);

  const userColors = [
    { color: '#30bced', light: '#30bced33' },
    { color: '#6eeb83', light: '#6eeb8333' },
    { color: '#ffbc42', light: '#ffbc4233' },
    { color: '#ecd444', light: '#ecd44433' },
    { color: '#ee6352', light: '#ee635233' },
    { color: '#9ac2c9', light: '#9ac2c933' },
    { color: '#8acb88', light: '#8acb8833' },
    { color: '#1be7ff', light: '#1be7ff33' },
  ];

  useEffect(() => {
    if (!roomId || !client) {
      return;
    }

    const { room, leave } = client.enterRoom(roomId, {
      initialPresence: {},
      initialStorage: {},
    });

    roomRef.current = room;
    leaveRef.current = leave;

    const yjsProvider = new LiveblocksYjsProvider(room, yDocRef.current);
    providerRef.current = yjsProvider;

    yjsProvider.once('sync', (synced: boolean) => {
      if (synced) {
        const yElements = yDocRef.current.getArray<Y.Map<unknown>>('elements');
        const elements = yjsToExcalidraw(yElements as Y.Array<Y.Map<unknown>>);
        setInitialElements(elements);
        setIsLoading(false);
      }
    });

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
    if (!excalidrawAPI || !yDocRef.current || !providerRef.current || isLoading) {
      return;
    }

    const yElements = yDocRef.current.getArray<Y.Map<unknown>>('elements');
    const yAssets = yDocRef.current.getMap('assets');
    const awareness = providerRef.current.awareness;
    const excalidrawDom = excalidrawRef.current;

    if (!awareness || !excalidrawDom) {
      return;
    }

    const userColor = userColors[Math.floor(Math.random() * userColors.length)];

    awareness.setLocalStateField('user', {
      name: 'User',
      color: userColor.color,
      colorLight: userColor.light,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (awareness as any).clientID = (awareness as any).doc.clientID;

    const undoManager = new UndoManager(yElements, {
      trackedOrigins: new Set([]),
      captureTimeout: 500,
      doc: yDocRef.current,
      ignoreRemoteMapChanges: false,
    });

    const binding = new ExcalidrawBinding(
      yElements,
      yAssets,
      excalidrawAPI,
      awareness,
      {
        excalidrawDom,
        undoManager,
      }
    );

    bindingRef.current = binding;

    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
      undoManager.destroy();
    };
  }, [isLoading, excalidrawAPI]);

  if (isLoading) {
    return (
      <div className={className} style={{ height: '100%', width: '100%' }}>
        <Loading fullScreen={false} message="Loading whiteboard..." />
      </div>
    );
  }

  return (
    <div className={className} style={{ height: '100%', width: '100%', display: 'flex' }}>
      <div
        className={`${styles.whiteboardContainer} excalidraw-container`}
        ref={excalidrawRef}
        style={{ height: '100%', width: '100%' }}
      >
        <Excalidraw
          excalidrawAPI={setExcalidrawAPI}
          initialData={{
            elements: initialElements,
          }}
          onPointerUpdate={(payload) => {
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

