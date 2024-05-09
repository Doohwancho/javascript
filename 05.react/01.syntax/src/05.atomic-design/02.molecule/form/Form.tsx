/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import TextInput from '../../01.atom/textInput/TextInput';
import { Button } from '../../01.atom/button';

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const formStyles = css`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
  `;

  const inputStyles = css`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `;

  const textareaStyles = css`
    ${inputStyles}
    height: 100px;
    resize: vertical;
  `;


  return (
    <form css={formStyles} onSubmit={handleSubmit}>
        <TextInput variant="outline" inputSize="sm" label="Id" />
        <TextInput variant="outline" inputSize="sm" label="Password" />
        <Button>Login</Button>
      {/* <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        css={inputStyles}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        css={inputStyles}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        css={textareaStyles}
        required
      ></textarea>
      <button type="submit" css={buttonStyles}>
        Submit
      </button> */}
    </form>
  );
};

export default Form;