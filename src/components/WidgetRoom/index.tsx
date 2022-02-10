import { BiRightArrow } from 'react-icons/bi';
import { MdOutlineContentCopy } from 'react-icons/md';
import { Container } from './styles';

export function WidgetRoom({ title, id }: any) {
  return (
    <Container>
      <span>{title}</span>

      <div>
        <button>
          <MdOutlineContentCopy />
        </button>
        <button>
          <BiRightArrow />
        </button>
      </div>
    </Container>
  );
}
