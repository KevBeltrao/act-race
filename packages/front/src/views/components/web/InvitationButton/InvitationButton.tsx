import { type FC } from 'react';
import { toast } from 'react-toastify';

import { Button } from './styles';

const InvitationButton: FC<{ code: string }> = ({ code }) => {
  const copyInvitationLink = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_LOCAL_URL}?lobby=${code}`);
    toast('Copied invitation link to clipboard');
  };

  return (
    <Button onClick={copyInvitationLink}>
      <h3>{code}</h3>
      <p>Copy Invitation Link</p>
    </Button>
  );
}
 
export default InvitationButton;
