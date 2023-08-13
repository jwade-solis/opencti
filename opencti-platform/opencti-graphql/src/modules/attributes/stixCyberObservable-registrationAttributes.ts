import * as R from 'ramda';
import type { AttributeDefinition, } from '../../schema/attribute-definition';
import { schemaAttributesDefinition } from '../../schema/schema-attributes';
import {
  ENTITY_AUTONOMOUS_SYSTEM,
  ENTITY_BANK_ACCOUNT,
  ENTITY_CRYPTOGRAPHIC_KEY,
  ENTITY_CRYPTOGRAPHIC_WALLET,
  ENTITY_DIRECTORY,
  ENTITY_DOMAIN_NAME,
  ENTITY_EMAIL_ADDR,
  ENTITY_EMAIL_MESSAGE,
  ENTITY_EMAIL_MIME_PART_TYPE,
  ENTITY_HASHED_OBSERVABLE_ARTIFACT,
  ENTITY_HASHED_OBSERVABLE_STIX_FILE,
  ENTITY_HASHED_OBSERVABLE_X509_CERTIFICATE,
  ENTITY_HOSTNAME,
  ENTITY_IPV4_ADDR,
  ENTITY_IPV6_ADDR,
  ENTITY_MAC_ADDR,
  ENTITY_MEDIA_CONTENT,
  ENTITY_MUTEX,
  ENTITY_NETWORK_TRAFFIC,
  ENTITY_PAYMENT_CARD,
  ENTITY_PHONE_NUMBER,
  ENTITY_PROCESS,
  ENTITY_SOFTWARE,
  ENTITY_TEXT,
  ENTITY_URL,
  ENTITY_USER_ACCOUNT,
  ENTITY_USER_AGENT,
  ENTITY_WINDOWS_REGISTRY_KEY,
  ENTITY_WINDOWS_REGISTRY_VALUE_TYPE
} from '../../schema/stixCyberObservable';
import { ABSTRACT_STIX_CYBER_OBSERVABLE } from '../../schema/general';

const stixCyberObservableAttributes: Array<AttributeDefinition> = [
  { name: 'x_opencti_description', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Description' },
  { name: 'x_opencti_score', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
];
schemaAttributesDefinition.registerAttributes(ABSTRACT_STIX_CYBER_OBSERVABLE, stixCyberObservableAttributes);

const stixCyberObservablesAttributes: { [k: string]: Array<AttributeDefinition> } = {
  [ENTITY_AUTONOMOUS_SYSTEM]: [
    { name: 'number', type: 'numeric', mandatoryType: 'external', editDefault: true, multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'rir', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_DIRECTORY]: [
    { name: 'path', type: 'string', mandatoryType: 'external', editDefault: true, multiple: false, upsert: true },
    { name: 'path_enc', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'ctime', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'mtime', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'atime', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_DOMAIN_NAME]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_EMAIL_ADDR]: [
    { name: 'value', type: 'string', mandatoryType: 'external', editDefault: true, multiple: false, upsert: true },
    { name: 'display_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Display name' },
  ],
  [ENTITY_EMAIL_MESSAGE]: [
    { name: 'is_multipart', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'attribute_date', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'content_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'message_id', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'received_lines', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: true },
    { name: 'body', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_EMAIL_MIME_PART_TYPE]: [
    { name: 'body', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'content_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'content_disposition', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_HASHED_OBSERVABLE_ARTIFACT]: [
    { name: 'mime_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Mime type' },
    { name: 'hashes', type: 'dictionary', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'payload_bin', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Payload' },
    { name: 'url', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'encryption_algorithm', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Algorithm' },
    { name: 'decryption_key', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Description key' },
    { name: 'x_opencti_additional_names', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: true },
  ],
  [ENTITY_HASHED_OBSERVABLE_STIX_FILE]: [
    { name: 'hashes', type: 'dictionary', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'extensions', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'size', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'name_enc', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'magic_number_hex', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'ctime', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'mtime', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'atime', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'x_opencti_additional_names', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: true },
    { name: 'mime_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'obsContent', type: 'string', mandatoryType: 'no', multiple: false, upsert: false },
  ],
  [ENTITY_HASHED_OBSERVABLE_X509_CERTIFICATE]: [
    { name: 'hashes', type: 'dictionary', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'is_self_signed', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'version', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'serial_number', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'signature_algorithm', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'issuer', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'validity_not_before', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'validity_not_after', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject_public_key_algorithm', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject_public_key_modulus', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject_public_key_exponent', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'basic_constraints', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'name_constraints', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'policy_constraints', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'key_usage', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'extended_key_usage', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject_key_identifier', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'authority_key_identifier', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject_alternative_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'issuer_alternative_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'subject_directory_attributes', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'crl_distribution_points', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'inhibit_any_policy', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'private_key_usage_period_not_before', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'private_key_usage_period_not_after', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'certificate_policies', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'policy_mappings', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_IPV4_ADDR]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_IPV6_ADDR]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_MAC_ADDR]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_MUTEX]: [
    { name: 'name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_NETWORK_TRAFFIC]: [
    { name: 'extensions', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'start', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'end', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'is_active', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'src_port', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'dst_port', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'protocols', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: true },
    { name: 'src_byte_count', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'dst_byte_count', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'src_packets', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'dst_packets', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_PROCESS]: [
    { name: 'extensions', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'is_hidden', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'pid', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'created_time', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'cwd', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'command_line', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'environment_variables', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: true },
    // windows-process-ext
    { name: 'aslr_enabled', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'dep_enabled', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'priority', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'owner_sid', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'window_title', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'startup_info', type: 'dictionary', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'integrity_level', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    // windows-service-ext
    { name: 'service_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'descriptions', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: false },
    { name: 'display_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false, label: 'Display name' },
    { name: 'group_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'start_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'service_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    { name: 'service_status', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false },
    // Missing serviceDlls
  ],
  [ENTITY_SOFTWARE]: [
    { name: 'name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'cpe', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'swid', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'languages', type: 'string', mandatoryType: 'no', editDefault: false, multiple: true, upsert: true },
    { name: 'vendor', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'version', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_URL]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_USER_ACCOUNT]: [
    { name: 'extensions', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'user_id', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'credential', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_login', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'display_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Display name' },
    { name: 'is_service_account', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'is_privileged', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'can_escalate_privs', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'is_disabled', type: 'boolean', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_created', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_expires', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'credential_last_changed', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_first_login', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_last_login', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_WINDOWS_REGISTRY_KEY]: [
    { name: 'attribute_key', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'modified_time', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'number_of_subkeys', type: 'numeric', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_WINDOWS_REGISTRY_VALUE_TYPE]: [
    { name: 'name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'data', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'data_type', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_CRYPTOGRAPHIC_KEY]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_CRYPTOGRAPHIC_WALLET]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_HOSTNAME]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_TEXT]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_USER_AGENT]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_BANK_ACCOUNT]: [
    { name: 'iban', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'bic', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'account_number', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: false, label: 'Account number' },
  ],
  [ENTITY_PHONE_NUMBER]: [
    { name: 'value', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_PAYMENT_CARD]: [
    { name: 'card_number', type: 'string', mandatoryType: 'external', editDefault: true, multiple: false, upsert: false },
    { name: 'expiration_date', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'cvv', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'holder_name', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
  ],
  [ENTITY_MEDIA_CONTENT]: [
    { name: 'title', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'content', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true },
    { name: 'media_category', type: 'string', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Media category' },
    { name: 'url', type: 'string', mandatoryType: 'external', editDefault: true, multiple: false, upsert: false },
    { name: 'publication_date', type: 'date', mandatoryType: 'no', editDefault: false, multiple: false, upsert: true, label: 'Publication date' },
  ],
};
R.forEachObjIndexed((value, key) => schemaAttributesDefinition.registerAttributes(key as string, value), stixCyberObservablesAttributes);
