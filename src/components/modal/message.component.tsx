import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./modal.styles.scss";

type messageProps = {
  status: string;
  icon: any;
};

const Modal: React.FC<messageProps> = (props: messageProps) => {
  const { status, icon } = props;
  return (
    <>
      <div className="modal__header">
        <div className="modal__icon">
          <FontAwesomeIcon
            className="icon modal__check"
            icon={icon}
            size="2x"
          />
        </div>
        <h1 className="modal__title">{status}</h1>
      </div>
      <div className="modal__transaction">
        <div className="modal__transaction--value">0 ONE</div>
        <div className="modal__transaction--message">You Deposited</div>
      </div>
      <div className="modal__transaction">
        <div className="modal__transaction--value">0 aONE</div>
        <div className="modal__transaction--message">You Received</div>
      </div>
      <div className="modal__tx">
        <div className="modal__tx--hash">
          <div className="modal__tx--title">TX Hash</div>
          <div className="modal__tx--value">one1x9s...8jb</div>
        </div>
        <div className="modal__tx--fee">
          <div className="modal__tx--title">TX Fee</div>
          <div className="modal__tx--value">0.0000 ONE</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
