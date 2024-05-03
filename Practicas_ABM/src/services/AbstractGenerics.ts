abstract class AbstractGenerics<T>{
    abstract getData<T>(path: string): Promise<T>;
    abstract postData<T>(path: string, data: T): Promise<T>;
    abstract putData<T>(path: string, data: T): Promise<T>;
    abstract deleteData(path: string): void;
}

export default AbstractGenerics;