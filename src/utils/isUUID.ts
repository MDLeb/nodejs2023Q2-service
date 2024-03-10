import * as uuid from 'uuid'

export const isUUID = (id: any) => uuid.validate(id)
