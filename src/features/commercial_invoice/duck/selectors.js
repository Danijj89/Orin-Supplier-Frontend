
export const selectCISteps = state => state.ci.steps;
export const selectCIActiveStep = state => state.ci.activeStep;
export const selectNewCI = state => state.ci.newCI;
export const selectCIAutocompleteOptions = state => state.ci.autocomplete;
export const selectCIFilePreview = state => state.ci.previewFileURL;
export const selectCIStatus = state => state.ci.status;
export const selectCIError = state => state.ci.error;