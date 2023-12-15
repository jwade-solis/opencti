import { graphql, useFragment, useMutation } from 'react-relay';
import React, { FunctionComponent } from 'react';
import { Option } from '@components/common/form/ReferenceField';
import * as Yup from 'yup';
import { FormikConfig } from 'formik/dist/types';
import { ExternalReferencesValues } from '@components/common/form/ExternalReferencesField';
import { Field, Form, Formik } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import CreatorField from '@components/common/form/CreatorField';
import CommitMessage from '@components/common/form/CommitMessage';
import { IngestionCsvEditionFragment_ingestionCsv$key } from '@components/data/ingestionCsv/__generated__/IngestionCsvEditionFragment_ingestionCsv.graphql';
import { convertUser } from '../../../../utils/edition';
import { useFormatter } from '../../../../components/i18n';
import { useSchemaEditionValidation } from '../../../../utils/hooks/useEntitySettings';
import { adaptFieldValue } from '../../../../utils/String';
import TextField from '../../../../components/TextField';
import { fieldSpacingContainerStyle } from '../../../../utils/field';
import SelectField from '../../../../components/SelectField';

export const ingestionCsvEditionPatch = graphql`
  mutation IngestionCsvEditionPatchMutation($id: ID!, $input: [EditInput!]!) {
    ingestionCsvFieldPatch(id: $id, input: $input) {
      ...IngestionCsvEditionFragment_ingestionCsv
    }
  } 
`;

const ingestionCsvEditionFragment = graphql`
  fragment IngestionCsvEditionFragment_ingestionCsv on IngestionCsv {
    id
    name
    description
    uri
    authentication_type
    authentication_value
    ingestion_running
    mapper {
      edges {
        node {
          id
          name
        }
      }
    }
    user {
      id
      entity_type
      name
    }
  }
`;

interface IngestionCsvEditionProps {
  ingestionCsv: IngestionCsvEditionFragment_ingestionCsv$key;
  handleClose: () => void;
  enableReferences?: boolean
}

interface IngestionCsvEditionForm {
  message?: string
  references: ExternalReferencesValues | undefined
  name: string,
  description: string | null,
  uri: string,
  authentication_type: string,
  authentication_value: string,
  ingestion_running: boolean,
  mapper: Option[],
  user_id: string | { label: string; value: string; type: string };
}

const IngestionCsvEdition: FunctionComponent<IngestionCsvEditionProps> = ({
  ingestionCsv,
  handleClose,
  enableReferences = false,
}) => {
  const { t } = useFormatter();
  const csvIngestion = useFragment(ingestionCsvEditionFragment, ingestionCsv);
  const basicShape = {
    name: Yup.string().required(t('This field is required')),
    description: Yup.string().nullable(),
    uri: Yup.string().required(t('This field is required')),
    authentication_type: Yup.string().required(t('This field is required')),
    authentication_value: Yup.string().nullable(),
    user_id: Yup.mixed().nullable(),
    mapper: Yup.string().required(t('This field is required')),
  };

  const ingestionCsvValidator = useSchemaEditionValidation('IngestionCsv', basicShape);
  const [commitUpdate] = useMutation(ingestionCsvEditionPatch);

  const onSubmit: FormikConfig<IngestionCsvEditionForm>['onSubmit'] = (values, { setSubmitting }) => {
    const { message, references, ...otherValues } = values;
    const commitMessage = message ?? '';
    const commitReferences = (references ?? []).map(({ value }) => value);
    const inputValues = Object.entries({
      ...otherValues,
    }).map(([key, value]) => ({ key, value: adaptFieldValue(value) }));
    commitUpdate({
      variables: {
        id: csvIngestion.id,
        input: inputValues,
        commitMessage: commitMessage && commitMessage.length > 0 ? commitMessage : null,
        references: commitReferences,
      },
      onCompleted: () => {
        setSubmitting(false);
        handleClose();
      },
    });
  };

  const handleSubmitField = (name: string, value: Option | string | string[] | number | number[] | null) => {
    let finalValue = value as string;
    if (name === 'user_id') {
      finalValue = (value as Option).value;
    }
    ingestionCsvValidator
      .validateAt(name, { [name]: value })
      .then(() => {
        commitUpdate({
          variables: {
            id: csvIngestion.id,
            input: { key: name, value: finalValue || '' },
          },
        });
      })
      .catch(() => false);
  };

  const initialValues = {
    name: csvIngestion.name,
    description: csvIngestion.description,
    uri: csvIngestion.uri,
    authentication_type: csvIngestion.authentication_type,
    authentication_value: csvIngestion.authentication_value,
    ingestion_running: csvIngestion.ingestion_running,
    mapper: csvIngestion.mapper,
    user_id: convertUser(csvIngestion, 'user'),
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues as never}
      validationSchema={ingestionCsvValidator}
      onSubmit={onSubmit}
    >
      {({
        values,
        submitForm,
        isSubmitting,
        setFieldValue,
        isValid,
        dirty,
      }) => (
        <Form style={{ margin: '20px 0 20px 0' }}>
          <Field
            component={TextField}
            variant="standard"
            name="name"
            label={t('Name')}
            fullWidth={true}
            onSubmit={handleSubmitField}
          />
          <Field
            component={TextField}
            variant="standard"
            name="description"
            label={t('Description')}
            fullWidth={true}
            style={fieldSpacingContainerStyle}
            onSubmit={handleSubmitField}
          />
          <Field
            component={TextField}
            variant="standard"
            name="uri"
            label={t('CSV URL')}
            fullWidth={true}
            onSubmit={handleSubmitField}
            style={fieldSpacingContainerStyle}
          />
          <Field
            component={TextField}
            variant="standard"
            name="mapper"
            label={t('CSV mapper')}
            fullWidth={true}
            onSubmit={handleSubmitField}
            style={fieldSpacingContainerStyle}
          />
          <Field
            component={SelectField}
            variant="standard"
            name="authentication_type"
            label={t('Authentication type')}
            onSubmit={handleSubmitField}
            fullWidth={true}
            containerstyle={{
              width: '100%',
              marginTop: 20,
            }}
          >
            <MenuItem value="none">{t('None')}</MenuItem>
            <MenuItem value="basic">{t('Basic user / password')}</MenuItem>
            <MenuItem value="bearer">{t('Bearer token')}</MenuItem>
            <MenuItem value="certificate">
              {t('Client certificate')}
            </MenuItem>
          </Field>
          {values.authentication_type === 'basic' && (
            <>
              <Field
                component={TextField}
                variant="standard"
                name="username"
                label={t('Username')}
                onSubmit={handleSubmitField}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
              <Field
                component={TextField}
                variant="standard"
                name="password"
                label={t('Password')}
                onSubmit={handleSubmitField}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
            </>
          )}
          {values.authentication_type === 'bearer' && (
            <Field
              component={TextField}
              variant="standard"
              name="authentication_value"
              label={t('Token')}
              onSubmit={handleSubmitField}
              fullWidth={true}
              style={fieldSpacingContainerStyle}
            />
          )}
          {values.authentication_type === 'certificate' && (
            <>
              <Field
                component={TextField}
                variant="standard"
                name="cert"
                label={t('Certificate (base64)')}
                onSubmit={handleSubmitField}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
              <Field
                component={TextField}
                variant="standard"
                name="key"
                label={t('Key (base64)')}
                onSubmit={handleSubmitField}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
              <Field
                component={TextField}
                variant="standard"
                name="ca"
                label={t('CA certificate (base64)')}
                onSubmit={handleSubmitField}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
            </>
          )}
          <CreatorField
            name="user_id"
            label={t('User responsible for data creation (empty = System)')}
            onChange={handleSubmitField}
            containerStyle={fieldSpacingContainerStyle}
          />
          {enableReferences && (
            <CommitMessage
              submitForm={submitForm}
              disabled={isSubmitting || !isValid || !dirty}
              setFieldValue={setFieldValue}
              open={false}
              values={values.references}
              id={csvIngestion.id}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default IngestionCsvEdition;