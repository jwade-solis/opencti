import React, { FunctionComponent } from 'react';
import { Field, Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { graphql, useMutation } from 'react-relay';
import MenuItem from '@mui/material/MenuItem';
import makeStyles from '@mui/styles/makeStyles';
import { IngestionCsvLinesPaginationQuery$variables } from '@components/data/ingestionCsv/__generated__/IngestionCsvLinesPaginationQuery.graphql';
import {FormikConfig, FormikHelpers} from 'formik/dist/types';
import { Option } from '@components/common/form/ReferenceField';
import Drawer, { DrawerVariant } from '../../common/drawer/Drawer';
import { useFormatter } from '../../../../components/i18n';
import TextField from '../../../../components/TextField';
import CreatorField from '../../common/form/CreatorField';
import { fieldSpacingContainerStyle } from '../../../../utils/field';
import { insertNode } from '../../../../utils/store';
import SelectField from '../../../../components/SelectField';
import { Theme } from '../../../../components/Theme';
import {
  IngestionCsvCreationMutation, IngestionCsvCreationMutation$variables
} from "@components/data/ingestionCsv/__generated__/IngestionCsvCreationMutation.graphql";

const useStyles = makeStyles<Theme>((theme) => ({
  buttons: {
    marginTop: 20,
    textAlign: 'right',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const ingestionCsvCreationMutation = graphql`
  mutation IngestionCsvCreationMutation($input: IngestionCsvAddInput!) {
    ingestionCsvAdd(input: $input) {
      ...IngestionCsvLine_node
    }
  }
`;

interface IngestionCsvCreationProps {
  paginationOptions: IngestionCsvLinesPaginationQuery$variables;
}

interface IngestionCsvCreationForm {
  name: string
  description: string
  uri: string
  mapper: Option[]
  authentication_type: string
  authentication_value: string
  user_id: string
  username: string
  password: string
  cert: string
  key: string
  ca: string
}

const IngestionCsvCreation: FunctionComponent<IngestionCsvCreationProps> = ({ paginationOptions }) => {
  const { t } = useFormatter();
  const classes = useStyles();

  const ingestionCsvCreationValidation = () => Yup.object().shape({
    name: Yup.string().required(t('This field is required')),
    description: Yup.string().nullable(),
    uri: Yup.string().required(t('This field is required')),
    authentication_type: Yup.string().required(t('This field is required')),
    authentication_value: Yup.string().nullable(),
    mapper: Yup.array().required(t('This field is required')),
    username: Yup.string().nullable(),
    password: Yup.string().nullable(),
    cert: Yup.string().nullable(),
    key: Yup.string().nullable(),
    ca: Yup.string().nullable(),
    user_id: Yup.object().nullable(),
  });

  const [commit] = useMutation(ingestionCsvCreationMutation);
  const onSubmit: FormikConfig<IngestionCsvCreationForm>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }: FormikHelpers<IngestionCsvCreationForm>,
  ) => {
    let authentifcationValue = values.authentication_value;
    if (values.authentication_type === 'basic') {
      authentifcationValue = `${values.username}:${values.password}`;
    } else if (values.authentication_type === 'certificate') {
      authentifcationValue = `${values.cert}:${values.key}:${values.ca}`;
    }
    const input: IngestionCsvCreationMutation$variables['input'] = {
      name: values.name,
      description: values.description,
      uri: values.uri,
      mapper: values.mapper.map((v) => v.value),
      authentication_type: values.authentication_type,
      authentication_value: authentifcationValue,
      user_id: values.user_id,
    };
    commit({
      variables: {
        input,
      },
      updater: (store) => {
        insertNode(
          store,
          'Pagination_ingestionCsvs',
          paginationOptions,
          'ingestionCsvAdd',
        );
      },
      onCompleted: () => {
        setSubmitting(false);
        resetForm();
      },
    });
  };
  return (
    <Drawer
      title={t('Create a CSV ingester')}
      variant={DrawerVariant.createWithPanel}
    >
      {({ onClose }) => (
        <Formik
          initialValues={{
            name: '',
            description: '',
            uri: '',
            mapper: [],
            authentication_type: 'none',
            authentication_value: '',
            user_id: '',
            username: '',
            password: '',
            cert: '',
            key: '',
            ca: '',
          }}
          validationSchema={ingestionCsvCreationValidation}
          onSubmit={onSubmit}
          onReset={onClose}
        >
          {({ submitForm, handleReset, isSubmitting, values }) => (
            <Form style={{ margin: '20px 0 20px 0' }}>
              <Field
                component={TextField}
                variant="standard"
                name="name"
                label={t('Name')}
                fullWidth={true}
              />
              <Field
                component={TextField}
                variant="standard"
                name="description"
                label={t('Description')}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
              <Field
                component={TextField}
                variant="standard"
                name="uri"
                label={t('CSV URL')}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
              <Field
                component={TextField}
                variant="standard"
                name="mapper"
                label={t('CSV Mapper')}
                fullWidth={true}
                style={fieldSpacingContainerStyle}
              />
              <Field
                component={SelectField}
                variant="standard"
                name="authentication_type"
                label={t('Authentication type')}
                fullWidth={true}
                containerstyle={{
                  width: '100%',
                  marginTop: 20,
                }}
              >
                <MenuItem value="none">{t('None')}</MenuItem>
                <MenuItem value="basic">
                  {t('Basic user / password')}
                </MenuItem>
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
                    fullWidth={true}
                    style={fieldSpacingContainerStyle}
                  />
                  <Field
                    component={TextField}
                    variant="standard"
                    name="password"
                    label={t('Password')}
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
                    fullWidth={true}
                    style={fieldSpacingContainerStyle}
                  />
                  <Field
                    component={TextField}
                    variant="standard"
                    name="key"
                    label={t('Key (base64)')}
                    fullWidth={true}
                    style={fieldSpacingContainerStyle}
                  />
                  <Field
                    component={TextField}
                    variant="standard"
                    name="ca"
                    label={t('CA certificate (base64)')}
                    fullWidth={true}
                    style={fieldSpacingContainerStyle}
                  />
                </>
              )}
              <CreatorField
                name="user_id"
                label={t(
                  'User responsible for data creation (empty = System)',
                )}
                containerStyle={fieldSpacingContainerStyle}
              />
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  classes={{ root: classes.button }}
                >
                  {t('Cancel')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  classes={{ root: classes.button }}
                >
                  {t('Create')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Drawer>
  );
};

export default IngestionCsvCreation;
