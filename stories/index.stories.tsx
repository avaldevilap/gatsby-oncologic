import ApolloClient, { Operation } from 'apollo-boost';
import es from 'date-fns/locale/es';
import { Form, Formik, FormikActions } from 'formik';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import DateFnsUtils from '@date-io/date-fns';
import { storiesOf } from '@storybook/react';

import FilterForm from '../src/components/FilterForm';
import ClinicalStageSelect from '../src/components/UI/ClinicalStageSelect';
import MorphologySelect from '../src/components/UI/MorphologySelect';
import TopographySelect from '../src/components/UI/TopographySelect';

const client = new ApolloClient({
  uri: `http://localhost:8080/v1alpha1/graphql`,
  request: (operation:Operation) =>
    operation.setContext({
      headers: { "X-Hasura-Access-Key": "YRz84zdxgEiSRnJ" }
    })
});

const stories = storiesOf("Components", module).addDecorator(story => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
        {story()}
      </MuiPickersUtilsProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
));

interface ClinicalStageValue {
  clinical_stage_id: [];
  topography: [];
  morphology: [];
}

stories.add("Clinical Stage Select", () => {
  return (
    <Formik
      initialValues={{
        clinical_stage_id: []
      }}
      onSubmit={(
        values: ClinicalStageValue,
        actions: FormikActions<ClinicalStageValue>
      ) => {
        console.log(values);
        // action("onClick");
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <ClinicalStageSelect />
      </Form>
    </Formik>
  );
});

stories.add("FilterForm", () => <FilterForm />);

stories.add("react-select-material-ui", () => (
  <Formik
    initialValues={{
      topography: [],
      morphology: []
    }}
    onSubmit={(
      values: ClinicalStageValue,
      actions: FormikActions<ClinicalStageValue>
    ) => {
      console.log(values);
      // action("onClick");
      actions.setSubmitting(false);
    }}
  >
    <Form>
      <TopographySelect />
      <MorphologySelect />
    </Form>
  </Formik>
));
