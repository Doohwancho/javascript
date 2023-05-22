import ReactDOM from "react-dom";
import classes from './Modal.module.css';

type BackdropProps = {
    onClick: () => void;
};
  

const Backdrop: React.FC<BackdropProps>  = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick} />
}

type OverlayProps = {
    children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );    
}

type ModalProps = {
    children: React.ReactNode;
    hideCartHandler: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, hideCartHandler }) => {
    const backdropRoot = document.getElementById("backdrop-root");
    const overlayRoot = document.getElementById("overlay-root");
    

    if (!backdropRoot || !overlayRoot) {
      // Optionally, you could throw an error here or return null
      console.error("Could not find modal root!");
      return null;
    }
  
    return (
      <>
        {ReactDOM.createPortal(<Backdrop onClick={hideCartHandler} />, backdropRoot)}
        {ReactDOM.createPortal(<Overlay>{children}</Overlay>, overlayRoot)}
      </>
    );
};

export default Modal;