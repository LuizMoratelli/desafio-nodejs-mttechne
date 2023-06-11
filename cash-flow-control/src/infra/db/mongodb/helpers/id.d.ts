import { ObjectId } from 'mongodb';

export type MongoID<T> = Omit<T, 'id'> & { _id: ObjectId };
