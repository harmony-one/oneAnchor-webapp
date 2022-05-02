import React from "react";
import { resultType } from "components/deposit/deposit.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./modal.styles.scss";

type modalProps = {
  title: string;
  content: any;
  actions: any;
  setIsOpen: any;
  isProcessing: boolean;
  result: resultType;
};

const LoadingIcon = () => {
  return (
    <svg
      className="progress-bar"
      viewBox="0 0 96 96"
      xmlns="<http://www.w3.org/2000/svg>"
      preserveAspectRatio="xMidYMin"
    >
      <circle
        cx="12"
        cy="12"
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
  console.log("MODAL", result);
  return (
    <div className="modal" onClick={() => setIsOpen(false)}>
      <div className="modal__container">
        {isProcessing ? (
          <div className="modal__loader">
            <h2 className="modal__title">{title}</h2>
            <LoadingIcon />
          </div>
        ) : (
          <div className="modal__body">
            {result.errorMessage ? (
              <div className="modal__error">{result.errorMessage}</div>
            ) : (
              <>
                <div className="modal__header">
                  <div className="modal__icon">
                    <FontAwesomeIcon
                      className="icon modal__check"
                      icon={faCheck}
                      size="2x"
                    />
                  </div>
                  <h1 className="modal__title">Success! :)</h1>
                </div>
                <div className="modal__transaction">
                  <div className="modal__transaction--value">3,291.39 ONE</div>
                  <div className="modal__transaction--message">
                    You Deposited
                  </div>
                </div>
                <div className="modal__transaction">
                  <div className="modal__transaction--value">2.281.37 aONE</div>
                  <div className="modal__transaction--message">
                    You Received
                  </div>
                </div>
                <div className="modal__tx">
                  <div className="modal__tx--hash">
                    <div className="modal__tx--title">TX Hash</div>
                    <div className="modal__tx--value">one1x9s...8jb</div>
                  </div>
                  <div className="modal__tx--fee">
                    <div className="modal__tx--title">TX Fee</div>
                    <div className="modal__tx--value">0.00291 ONE</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <button className="modal__cta button" onClick={() => setIsOpen(false)}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
