import { createContext, use, type ReactNode } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ModalState {
  open: boolean;
  value: string;
}

interface ModalActions {
  update: (updater: (current: ModalState) => ModalState) => void;
}

interface ModalContextValue {
  state: ModalState;
  actions: ModalActions;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Helper hook to safely access context
const useModalContext = () => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal.Provider');
  }
  return context;
};

interface ModalProps {
  children: ReactNode;
  state: ModalState;
  actions: ModalActions;
}

const Modal = ({ children, state, actions }: ModalProps) => {
  return (
    <ModalContext.Provider value={{ state, actions }}>
      <Dialog
        open={state.open}
        onOpenChange={(open) => actions.update((current) => ({ ...current, open }))}
      >
        {children}
      </Dialog>
    </ModalContext.Provider>
  );
};

const Trigger = () => {
  const { actions } = useModalContext();

  return (
    <DialogTrigger asChild>
      <Button
        variant="outline"
        onClick={() => actions.update((current) => ({ ...current, open: true }))}
      >
        Open Dialog
      </Button>
    </DialogTrigger>
  );
};

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <DialogContent>{children}</DialogContent>;
};

interface HeaderProps {
  title?: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <DialogHeader>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogDescription>{description}</DialogDescription>}
    </DialogHeader>
  );
};

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <DialogFooter>{children}</DialogFooter>;
};

const InputField = () => {
  const { state, actions } = useModalContext();
  return (
    <Input
      value={state.value}
      onChange={(e) => actions.update((current) => ({ ...current, value: e.target.value }))}
    />
  );
};

const Submit = () => {
  const { actions } = useModalContext();
  return (
    <Button onClick={() => actions.update((current) => ({ ...current, open: false }))}>
      Submit
    </Button>
  );
};

Modal.Provider = Modal;
Modal.Trigger = Trigger;
Modal.Content = Content;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.InputField = InputField;
Modal.Submit = Submit;

export default Modal;
