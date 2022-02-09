import copyImg from '../../assets/images/copy.svg';
import { RoomCodeContainer } from './styles';

type RoomCodeProps = {
  code?: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    // @ts-ignore
    navigator.clipboard.writeText(code);
  }

  return (
    <RoomCodeContainer className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </RoomCodeContainer>
  );
}
