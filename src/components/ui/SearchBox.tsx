import SearchIcon from '@mui/icons-material/Search';
import { ComponentProps, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TextInput from 'src/components/ui/TextInput';

interface InputProps {
  label?: string;
  onChangeValue: {
    (value: string): void;
  };
}

interface Props extends ComponentProps<'input'>, InputProps {}

const generateId = () => `SearchBox__${uuidv4()}`;

export default function SearchBox(props: Props) {
  const [id, setId] = useState(() => props.id || generateId());

  useEffect(() => {
    setId(props.id || generateId());
  }, [props.id]);

  return (
    <TextInput id={id} placeholder='Search' {...props}>
      <SearchIcon color='action' />
    </TextInput>
  );
}
