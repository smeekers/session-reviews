import { useEffect, useRef, useState } from 'react';
import { createClient, type Room } from '@liveblocks/client';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import * as Y from 'yjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Excalidraw types are not fully exported, but these work at runtime
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/types';
import { yjsToExcalidraw } from 'y-excalidraw';

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY,
});

interface UseLiveblocksRoomResult {
  isLoading: boolean;
  initialElements: readonly ExcalidrawElement[];
  yDoc: Y.Doc;
  provider: LiveblocksYjsProvider | null;
  room: Room | null;
}

function useLiveblocksRoom(roomId: string): UseLiveblocksRoomResult {
  const [isLoading, setIsLoading] = useState(true);
  const [initialElements, setInitialElements] = useState<readonly ExcalidrawElement[]>([]);
  const yDocRef = useRef<Y.Doc>(new Y.Doc());
  const providerRef = useRef<LiveblocksYjsProvider | null>(null);
  const roomRef = useRef<Room | null>(null);
  const leaveRef = useRef<(() => void) | null>(null);

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

  return {
    isLoading,
    initialElements,
    yDoc: yDocRef.current,
    provider: providerRef.current,
    room: roomRef.current,
  };
}

export default useLiveblocksRoom;

