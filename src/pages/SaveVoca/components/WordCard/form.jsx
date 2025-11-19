import { Grid } from "@mui/material";
import { InputField, TextFieldWithCheckbox } from "./index";

const WordCardForm = ({
  word,
  checkList,
  handleInput,
  handleCheck,
  autoFocus = false,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField
            label="単語"
            value={word.word}
            autoFocus={autoFocus}
            type="word"
            handleInput={handleInput}
          />
          <TextFieldWithCheckbox
            checked={checkList.pronunciation}
            label="発音"
            type="pronunciation"
            value={word.pronunciation}
            handleCheck={() => handleCheck("pronunciation")}
            handleInput={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label="意味"
            value={word.mean}
            type="mean"
            handleInput={handleInput}
          />
          {[
            { propName: "explain", label: "説明" },
            { propName: "example", label: "例文" },
          ].map(({ propName, label }) => (
            <TextFieldWithCheckbox
              key={propName}
              checked={checkList[propName]}
              label={label}
              type={propName}
              value={word[propName]}
              handleCheck={() => handleCheck(propName)}
              handleInput={handleInput}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WordCardForm;
