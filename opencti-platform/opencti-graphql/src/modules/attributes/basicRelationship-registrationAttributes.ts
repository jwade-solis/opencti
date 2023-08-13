import {
  _index,
  AttributeDefinition,
  baseType,
  createdAt,
  creators,
  entityType,
  id,
  internalId,
  parentTypes,
  relationshipType,
  standardId,
  updatedAt
} from '../../schema/attribute-definition';
import { schemaAttributesDefinition } from '../../schema/schema-attributes';
import { ABSTRACT_BASIC_RELATIONSHIP } from '../../schema/general';

const basicRelationshipAttributes: Array<AttributeDefinition> = [
  _index,
  id,
  internalId,
  standardId,
  parentTypes,
  baseType,
  relationshipType,
  entityType,
  createdAt,
  updatedAt,
  creators,
  { name: 'fromType', type: 'string', mandatoryType: 'internal', multiple: false, upsert: false },
  { name: 'toType', type: 'string', mandatoryType: 'internal', multiple: false, upsert: false },
  { name: 'i_inference_weight', type: 'numeric', mandatoryType: 'no', multiple: false, upsert: false },
  { name: 'connections', type: 'dictionary', mandatoryType: 'internal', multiple: true, upsert: false },
];
schemaAttributesDefinition.registerAttributes(ABSTRACT_BASIC_RELATIONSHIP, basicRelationshipAttributes);
