import React from 'react';

interface BountyFormProps {
  handleSubmit: (data: object) => void;
}

const BountyForm: React.FC<BountyFormProps> = (props: BountyFormProps) => {
  const [award, setAward] = React.useState(1000);
  const [title, setTitle] = React.useState('My uber bounty');
  const [description, setDescription] = React.useState(
    'My crystal clear description'
  );

  const handleAwardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAward(event.target.valueAsNumber);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit({ title, award, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="string" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Award:
        <input type="number" value={award} onChange={handleAwardChange} />
      </label>
      <label>
        Description:
        <input
          type="string"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default BountyForm;
