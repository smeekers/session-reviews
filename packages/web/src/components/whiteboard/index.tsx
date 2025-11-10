import '@excalidraw/excalidraw/index.css';
import { useCallback, useRef, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { WHITEBOARD_STRINGS } from '../../constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Excalidraw types are not fully exported, but these work at runtime
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import useLiveblocksRoom from '../../hooks/use-liveblocks-room';
import useExcalidrawBinding from '../../hooks/use-excalidraw-binding';
import Loading from '../loading';
import * as styles from './index.css';

interface WhiteboardProps {
  className?: string;
  renderTopRightUI?: (isMobile: boolean, appState: unknown) => React.ReactElement | null;
  roomId: string;
}

function Whiteboard({ className, renderTopRightUI, roomId }: WhiteboardProps) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const excalidrawRef = useRef<HTMLDivElement>(null);

  const { isLoading, initialElements, yDoc, provider, room } = useLiveblocksRoom(roomId);

  useExcalidrawBinding({
    excalidrawAPI,
    yDoc,
    provider,
    excalidrawDom: excalidrawRef.current,
    isLoading,
  });

  if (isLoading) {
    return (
      <div className={className ? `${className} ${styles.loadingWrapper}` : styles.loadingWrapper}>
        <Loading fullScreen={false} message={WHITEBOARD_STRINGS.LOADING} />
      </div>
    );
  }

  return (
    <div className={className ? `${className} ${styles.whiteboardWrapper}` : styles.whiteboardWrapper}>
      <div
        className={`${styles.whiteboardContainer} excalidraw-container`}
        ref={excalidrawRef}
      >
        <Excalidraw
          excalidrawAPI={setExcalidrawAPI}
          initialData={{
            elements: initialElements,
          }}
          onPointerUpdate={useCallback(
            (payload: { pointer: { x: number; y: number } | null }) => {
              if (room) {
                room.updatePresence({
                  cursor: payload.pointer ? { x: payload.pointer.x, y: payload.pointer.y } : null,
                });
              }
            },
            [room]
          )}
          renderTopRightUI={renderTopRightUI}
        />
      </div>
    </div>
  );
}

export default Whiteboard;

