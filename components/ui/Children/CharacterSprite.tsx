import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

type Direction = 'up' | 'down' | 'left' | 'right';

interface CharacterSpriteProps {
  sprite: string;
  direction?: Direction;
  position?: [number, number];
  target?: [number, number];
  speed?: number;
  frameDuration?: number;
  spriteSize?: { width: number; height: number };
  rows?: number;
  columns?: number;
  onArrive?: () => void;
}

/**
 * Um componente reutilizável para renderizar e animar um personagem.
 * - Mostra animação por coluna (cada coluna é uma direção).
 * - Pode ficar parado ou se mover automaticamente até um ponto alvo.
 */

const { width, height } = Dimensions.get("window");

const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  sprite,
  direction = 'down',
  position: initialPosition = [0, 0],
  target,
  speed = 2,
  frameDuration = 150,
  spriteSize = { width: width * 0.2, height: width * 0.2 },
  rows = 4,
  columns = 4,
  onArrive,
}) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [frameIndex, setFrameIndex] = useState(0);
  const [currentDirection, setCurrentDirection] = useState<Direction>(direction);

  const spriteSheet =
    sprite === 'boy'
      ? require('@/assets/sprites/boy.png')
      : require('@/assets/sprites/girl.png');

  // Define a coluna da sprite conforme a direção (coluna = movimento)
  const getDirectionCol = (dir: Direction) => {
    switch (dir) {
      case 'down':
        return 0;
      case 'left':
        return 1;
      case 'up':
        return 2;
      case 'right':
        return 3;
      default:
        return 0;
    }
  };

  // Atualiza o frame da animação (loop nas linhas)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % rows);
    }, frameDuration);

    return () => clearInterval(interval);
  }, [rows, frameDuration]);

  // Movimento até o alvo
  useEffect(() => {
    if (!target) return;

    const moveInterval = setInterval(() => {
      const [x, y] = position;
      const [tx, ty] = target;
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        onArrive?.();
        return;
      }

      const angle = Math.atan2(dy, dx);
      const newX = x + Math.cos(angle) * speed;
      const newY = y + Math.sin(angle) * speed;

      // Define direção baseada no vetor de movimento
      const newDir: Direction =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
          ? 'down'
          : 'up';
      setCurrentDirection(newDir);

      setPosition([newX, newY]);
    }, 30);

    return () => clearInterval(moveInterval);
  }, [position, target, speed, onArrive]);

  const col = getDirectionCol(currentDirection);
  const row = frameIndex;

  return (
    <View
      style={{
        width: spriteSize.width,
        height: spriteSize.height,
        overflow: 'hidden',
      }}
    >
      <Image
        source={spriteSheet}
        style={{
          width: spriteSize.width * columns,
          height: spriteSize.height * rows,
          transform: [
            { translateX: -col * spriteSize.width },
            { translateY: -row * spriteSize.height },
          ],
        }}
      />
    </View>
  );
};

export default CharacterSprite;
