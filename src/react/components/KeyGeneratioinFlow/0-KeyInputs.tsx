import { Button, Fade, FormControlLabel, Grid, Switch, TextField, Tooltip, Typography } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from "styled-components";
import { errors, tooltips } from '../../constants';

type GenerateKeysProps = {
  numberOfKeys: number,
  setNumberOfKeys: Dispatch<SetStateAction<number>>,
  index: number,
  setIndex: Dispatch<SetStateAction<number>>,
  showIndexInput: boolean,
  password: string,
  setPassword: Dispatch<SetStateAction<string>>,
  numberOfKeysError: boolean,
  passwordStrengthError: boolean,
  startingIndexError: boolean,
  onFinish: () => void
}

const StyledTextField = styled(TextField)`
  margin: 12px 0;
  width: 260px;
`

/**
 * This page gathers data about the keys to generate for the user
 * 
 * @param props self documenting parameters passed in
 * @returns 
 */
const KeyInputs = (props: GenerateKeysProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToggleShowAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  }

  const updateNumberOfKeys = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    props.setNumberOfKeys(num);
  }

  const updateIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    props.setIndex(num);
  }

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setPassword(e.target.value);
  }

  const updateEth1WithdrawAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setPassword(e.target.value);
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body1">
          Nice!  Your Secret Recovery Phrase is verified. Now let's collect some info about the keys to create:
        </Typography>
      </Grid>
      <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={3} xs={12}>
        <Grid item>
          <Tooltip title={tooltips.NUMBER_OF_KEYS}>
            <StyledTextField
              id="number-of-keys"
              label="Number of New Keys"
              variant="outlined"
              type="number"
              value={props.numberOfKeys}
              onChange={updateNumberOfKeys}
              InputProps={{ inputProps: { min: 1, max: 1000 } }}
              error={props.numberOfKeysError}
              helperText={ props.numberOfKeysError ? errors.NUMBER_OF_KEYS : ""}
            />
          </Tooltip>
        </Grid>
        { props.showIndexInput &&
          <Grid item>
            <Tooltip title={tooltips.STARTING_INDEX}>
              <StyledTextField
                id="index"
                label="Amount of Existing (starting index)"
                variant="outlined"
                type="number"
                value={props.index}
                onChange={updateIndex}
                InputProps={{ inputProps: { min: 0 } }}
                error={props.startingIndexError}
                helperText={props.startingIndexError ? errors.STARTING_INDEX : ""}
              />
            </Tooltip>
          </Grid>
        }
        <Grid item>
          <Tooltip title={tooltips.PASSWORD}>
            <StyledTextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={props.password}
              onChange={updatePassword}
              error={props.passwordStrengthError}
              helperText={props.passwordStrengthError ? errors.PASSWORD_STRENGTH : ""}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Switch checked={showAdvanced} onChange={handleToggleShowAdvanced} color="default" size="small" />}
          label="Show Advanced Inputs"
        />
      </Grid>
      <Grid item>
          <Fade in={showAdvanced} >
            <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={3} xs={12}>
              <Grid item>
                <Tooltip title={tooltips.ETH1_WITHDRAW_ADDRESS}>
                  <StyledTextField
                    id="eth1-withdraw-address"
                    label="(opt) Eth1 Withdraw Address"
                    variant="outlined"
                    value={props.password}
                    onChange={updatePassword}
                    error={props.numberOfKeysError}
                    helperText={ props.numberOfKeysError ? errors.NUMBER_OF_KEYS : ""}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
    </Grid>
  );
}

export default KeyInputs;
