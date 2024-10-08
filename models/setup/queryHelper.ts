import { Db, Filter, FilterOperators, ObjectId } from "mongodb";
import { connectDB } from "./connect";



class MongoDBQueryHelper<T> {
    private db: Db | null = null;
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.connect();
    }

    private async connect(): Promise<Db> {
        if (!this.db) {
            const client = await connectDB();
            this.db = client.db();
        }
        return this.db;
    }

    async findOne(query: object) {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            return await collection.findOne(query);
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async findById(id: string | ObjectId) {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            return await collection.findOne({ _id: typeof(id) == "string" ? (new ObjectId(id)) : id }) as T;
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async findByIdAndDelete(id: string | ObjectId) {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            return await collection.deleteOne({ _id: typeof(id) == "string" ? (new ObjectId(id)) : id }) as T;
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async find(query: object, options: { limit?: number; skip?: number } = {}) {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            const { limit = 0, skip = 0 } = options;
            return await collection.find(query).skip(skip).limit(limit).sort({createdAt: -1}).toArray() as T[];
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async create(data: any) {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            data.createdAt = new Date();
            data.updatedAt = new Date();
            const result = await collection.insertOne(data);
            return { ...data, _id: result.insertedId } as T;
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async findByIdAndUpdate(id: string | ObjectId, data: any): Promise<any> {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            data.updatedAt = new Date();


            return await collection.updateOne({_id: typeof(id) == "string" ? (new ObjectId(id)) : id}, { $set: data }) as T;
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async update(query: object, data: any): Promise<any> {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            data.updatedAt = new Date();
            return await collection.updateOne(query, { $set: data }) as T;
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async deleteOneDocument(query: object) {
        try {
            const db = await this.connect();
            const collection = db.collection(this.collectionName);
            return await collection.deleteOne(query) as T;
        } catch (error: any) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async count(query: object) {
        try {
            const db = await this.connect();
        const collection = db.collection(this.collectionName);
          return await collection.countDocuments(query);
        } catch (error: any) {
          throw new Error(`Error counting documents: ${error.message}`);
        }
      }

      async paginate(query: object, page:number = 1, limit: number = 10) {
        try {
          const count = await this.count(query);
          const totalPages = Math.ceil(count / limit);
          const skip = (page - 1) * limit;

          const db = await this.connect();
        const collection = db.collection(this.collectionName);
    
          const results = await collection
            .find(query)
            .skip(skip)
            .limit(limit).sort({createdAt: -1}).toArray();
    
          return {
            totalPages,
            currentPage: page,
            totalDocuments: count,
            currentPageDocumentCount: results.length,
            limit,
            results,
          };
        } catch (error: any) {
          throw new Error(`Error paginating documents: ${error.message}`);
        }
      }
}

export {
    MongoDBQueryHelper
}
