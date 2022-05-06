import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Message from "components/modal/message.component";
import { receiptType } from "web3/web3.utils";
import "./modal.styles.scss";

type modalProps = {
  title: string;
  content: any;
  actions: any;
  setIsOpen: any;
  isProcessing: boolean;
  result: receiptType;
};

const LoadingIcon = () => {
  return (
    <svg
      className="modal__loader"
      viewBox="0 0 20 20"
      xmlns="<http://www.w3.org/2000/svg>"
      preserveAspectRatio="xMidYMin"
    >
      <circle
        cx="50%"
        cy="50%"
        r="8"
        strokeWidth="2"
        stroke="#1F5AE2"
        fill="none"
      />
    </svg>
  );
};

const Modal: React.FC<modalProps> = (props: modalProps) => {
  const { title, setIsOpen, result, isProcessing } = props;
  // console.log("MODAL************", result);
  return (
    <div className="modal" onClick={() => setIsOpen(false)}>
      <div className="modal__container">
        {isProcessing ? (
          <div className="modal__process">
            <h2 className="modal__title">{title}</h2>
            <div className="modal__progress">
              <LoadingIcon />
            </div>
          </div>
        ) : (
          <div className="modal__body">
            {result.status ? (
              <Message status="Success! :)" icon={faCheck} result={result} />
            ) : (
              <Message status="Failure :(" icon={faXmark} result={result} />
            )}
          </div>
        )}

        { !isProcessing ?
          (<button className="modal__cta button" onClick={() => setIsOpen(false)}>
            Done
          </button>) : null
        }
      </div>
    </div>
  );
};

export default Modal;
