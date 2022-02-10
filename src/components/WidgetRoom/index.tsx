import { BiRightArrow } from 'react-icons/bi';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Container } from './styles';

type WidgetRoomProps = {
  id: string;
  title: string;
};

export function WidgetRoom({ title, id }: WidgetRoomProps) {
  function handleCopy() {
    toast.success('Código da Sala Copiado!', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Container>
      <span>{title}</span>

      <div>
        <CopyToClipboard text={id} onCopy={handleCopy}>
          <button>
            <MdOutlineContentCopy />
          </button>
        </CopyToClipboard>
        <Link to={`/admin/rooms/${id}`}>
          <BiRightArrow />
        </Link>
      </div>
    </Container>
  );
}
