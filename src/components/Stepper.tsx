import { FC, Fragment, useEffect, useState } from "react";
import Box from "./Box";
import { Chip } from "./Chip";
import FlexBox from "./FlexBox";
import { useAppContext } from "@context/AppContext";

type Step = { title: string; disabled: boolean };

type StepperProps = {
  stepperList: Step[];
  selectedStep?: number;
  onChange?: (Step: Step, index: number) => void;
};

const Stepper: FC<StepperProps> = ({ selectedStep, stepperList, onChange }) => {
  const { state } = useAppContext();
  const [selected, setSelected] = useState(selectedStep - 1);

  const primaryColor = state.shop?.primaryColorHex || null;

  const handleStepClick = (step: Step, ind: number) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(step, ind);
    }
  };

  useEffect(() => setSelected(selectedStep - 1), [selectedStep]);

  return (
    <FlexBox
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
      my="-4px"
    >
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <Chip
            my="4px"
            fontSize="14px"
            fontWeight="600"
            p="0.5rem 1.5rem"
            color={ind <= selected ? "white" : "primary.main"}
            cursor={step.disabled ? "not-allowed" : "pointer"}
            bg={ind <= selected ? primaryColor : "primary.light"}
            onClick={handleStepClick(step, ind)}
          >
            {ind + 1}. {step.title}
          </Chip>

          {ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bg={ind < selected ? primaryColor : "primary.light"}
            />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

Stepper.defaultProps = { selectedStep: 1 };

export default Stepper;
