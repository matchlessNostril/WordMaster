import { Grid } from "@mui/material";
import { InputField } from "./index";

const WordCardForm = ({ word, checkList, handleInput, autoFocus = false }) => {
  const checkCount = Object.values(checkList).filter(Boolean).length;
  return (
    <Grid item xs={12} sx={{ marginBottom: checkCount > 0 ? "16px" : 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <InputField
                label="単語"
                placeholder="単語を入力してください"
                value={word.word}
                autoFocus={autoFocus}
                type="word"
                handleInput={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              {checkList.pronunciation && (
                <InputField
                  label="発音"
                  placeholder="単語を入力してください"
                  value={word.pronunciation}
                  type="pronunciation"
                  handleInput={handleInput}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <InputField
                label="意味"
                placeholder="単語の意味を入力してください"
                value={word.mean}
                type="mean"
                handleInput={handleInput}
              />
            </Grid>
            {[
              {
                propName: "explain",
                label: "説明",
                placeholder: "単語の説明を入力してください",
              },
              {
                propName: "example",
                label: "例文",
                placeholder: "単語を使った例文を入力してください",
              },
            ].map(({ propName, label, placeholder }) => (
              <Grid item xs={12} key={propName}>
                {checkList[propName] && (
                  <InputField
                    label={label}
                    placeholder={placeholder}
                    value={word[propName]}
                    type={propName}
                    handleInput={handleInput}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WordCardForm;
