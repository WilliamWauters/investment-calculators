import {
  Box,
  Button,
  Step,
  Stepper,
  StepButton,
  StepContent,
  Fade,
} from "@mui/material";
import React, { useEffect } from "react";
import FormSection from "@/components/layout/FormSection";
import FormPane from "@/components/layout/FormPane";
import HouseSituationForm from "@/components/realestate/forms/HouseSituationForm";
import PersonalSituationForm from "@/components/realestate/forms/PersonalSituationForm";
import FinancialSituationForm from "@/components/realestate/forms/FinancialSituationForm";
import useStepper from "@/hooks/useStepperAction";
import ResultsForm from "@/components/realestate/components/RealEstateResultsForm";
import HouseSituationResults from "@/components/realestate/components/HouseSituationResults";
import PersonalSituationResults from "@/components/realestate/components/PersonalSituationResults";
import FinancialSituationResults from "@/components/realestate/components/FinancialSituationResults";
import {
  RealEstateFormActionKind,
  RealEstateFormState,
  useRealEstateForm,
} from "@/contexts/RealEstateFormContext";
import PaneHeader from "@/components/content/PaneHeader";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const forms = [
  {
    id: "houseSituation",
    label: "House",
    component: <HouseSituationForm />,
    results: <HouseSituationResults />,
  },
  {
    id: "personalSituation",
    label: "Person",
    component: <PersonalSituationForm />,
    results: <PersonalSituationResults />,
  },
  {
    id: "financialSituation",
    label: "Finance",
    component: <FinancialSituationForm />,
    results: <FinancialSituationResults />,
  },
  {
    id: "houseResults",
    label: "Results",
    component: <ResultsForm />,
  },
];

const RealEstateFormStepper = () => {
  const router = useRouter();
  const simulationId: string = router.query["id"] as string;
  const [activeForm, handleNext, handleBack, handleStep] = useStepper(forms);
  const { realEstateFormState, dispatch } = useRealEstateForm();

  useEffect(() => {
    setSimulation();
  }, []);

  const setSimulation = () => {
    try {
      const realEstateSimulationsJSON = localStorage.getItem(
        "realEstateSimulationsJSON"
      );
      var simulations = realEstateSimulationsJSON
        ? JSON.parse(realEstateSimulationsJSON)
        : null;

      if (simulations) {
        var simulation = simulations.find(
          (sim: RealEstateFormState) => sim.id === simulationId
        );
        console.log(simulation);
        if (simulation) {
          dispatch({
            type: RealEstateFormActionKind.SET_FORM,
            payload: simulation,
          });
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage item:", error);
    }
  };

  const addEditSimulation = () => {
    if (realEstateFormState.createdAt) {
      editSimulation(realEstateFormState.id);
    } else {
      addSimulation();
    }

    router.push("SimulationList");
  };

  const addSimulation = () => {
    // Check if there is already an value created for the list of simualtion
    const realEstateSimulationsJSON = localStorage.getItem(
      "realEstateSimulationsJSON"
    );
    var simulations = realEstateSimulationsJSON
      ? JSON.parse(realEstateSimulationsJSON)
      : [];

    // Add new simulation to the array
    simulations.push({
      ...realEstateFormState,
      id: uuidv4(),
      createdAt: new Date(),
    });
    console.log(simulations);

    // Update the LocalStorage
    localStorage.setItem(
      "realEstateSimulationsJSON",
      JSON.stringify(simulations)
    );
  };

  const editSimulation = (id: string) => {
    // Check if there is already an value created for the list of simualtion
    const realEstateSimulationsJSON = localStorage.getItem(
      "realEstateSimulationsJSON"
    );
    var simulations = realEstateSimulationsJSON
      ? JSON.parse(realEstateSimulationsJSON)
      : null;

    if (simulations) {
      const itemIndex = simulations.findIndex(
        (item: RealEstateFormState) => item.id === id
      );
      if (itemIndex !== -1) {
        simulations[itemIndex] = realEstateFormState;
        localStorage.setItem(
          "realEstateSimulationsJSON",
          JSON.stringify(simulations)
        );
      }
    }
  };

  const deleteSimulation = (id: string) => {
    // Retrieve the existing simulations from localStorage
    const realEstateSimulationsJSON = localStorage.getItem(
      "realEstateSimulationsJSON"
    );
    let simulations = realEstateSimulationsJSON
      ? JSON.parse(realEstateSimulationsJSON)
      : [];

    // Find the index of the simulation to be deleted
    const itemIndex = simulations.findIndex(
      (item: RealEstateFormState) => item.id === id
    );

    // Check if the simulation exists
    if (itemIndex !== -1) {
      // Remove the simulation from the array
      simulations.splice(itemIndex, 1);

      // Update the localStorage with the new array
      localStorage.setItem(
        "realEstateSimulationsJSON",
        JSON.stringify(simulations)
      );
    }
  };

  return (
    <>
      <PaneHeader
        title={
          realEstateFormState.id ? realEstateFormState.id.split("-")[0] : "NEW"
        }
        style={{ mx: 0 }}
        backButton={true}
        idSimulation={realEstateFormState.id}
      />
      <FormSection>
        <Box
          sx={{
            mx: "auto",
            my: 2,
            px: 2,
          }}
        >
          <Stepper nonLinear activeStep={activeForm}>
            {forms.map((form, index) => (
              <Step key={form.label}>
                <StepButton
                  color="inherit"
                  onClick={handleStep(index)}
                ></StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        <FormPane>{forms[activeForm].component}</FormPane>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mx: 2,
            my: 1,
          }}
        >
          <Button
            disabled={activeForm === 0}
            onClick={handleBack}
            sx={{
              bgcolor: "#1E293B",
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeForm !== forms.length - 1 && (
            <Button
              onClick={handleNext}
              sx={{
                bgcolor: "#1E293B",
              }}
            >
              Next
            </Button>
          )}
          {activeForm === forms.length - 1 && (
            <Button
              onClick={addEditSimulation}
              sx={{
                bgcolor: "#1E293B",
              }}
            >
              Save
            </Button>
          )}
        </Box>
      </FormSection>
    </>
  );
};

export default RealEstateFormStepper;
