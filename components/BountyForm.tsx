import React from 'react';

interface BountyFormProps {
  handleSubmit: (data: number) => void;
}

const BountyForm: React.FC<BountyFormProps> = (props: BountyFormProps) => {
  const [award, setAward] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAward(event.target.valueAsNumber);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit(award);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Award:
        <input type="number" value={award} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default BountyForm;
