
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model DailyLog
 * 
 */
export type DailyLog = $Result.DefaultSelection<Prisma.$DailyLogPayload>
/**
 * Model TaskCompletion
 * 
 */
export type TaskCompletion = $Result.DefaultSelection<Prisma.$TaskCompletionPayload>
/**
 * Model Title
 * 
 */
export type Title = $Result.DefaultSelection<Prisma.$TitlePayload>
/**
 * Model UserTitle
 * 
 */
export type UserTitle = $Result.DefaultSelection<Prisma.$UserTitlePayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model ArticleRead
 * 
 */
export type ArticleRead = $Result.DefaultSelection<Prisma.$ArticleReadPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Level: {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
};

export type Level = (typeof Level)[keyof typeof Level]


export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const TaskType: {
  PODCAST_LISTENING: 'PODCAST_LISTENING',
  LEARN_VERBS: 'LEARN_VERBS',
  CREATE_SENTENCES: 'CREATE_SENTENCES',
  SPEAKING_SESSION: 'SPEAKING_SESSION',
  DAY_RECAP: 'DAY_RECAP'
};

export type TaskType = (typeof TaskType)[keyof typeof TaskType]

}

export type Level = $Enums.Level

export const Level: typeof $Enums.Level

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type TaskType = $Enums.TaskType

export const TaskType: typeof $Enums.TaskType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs>;

  /**
   * `prisma.dailyLog`: Exposes CRUD operations for the **DailyLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyLogs
    * const dailyLogs = await prisma.dailyLog.findMany()
    * ```
    */
  get dailyLog(): Prisma.DailyLogDelegate<ExtArgs>;

  /**
   * `prisma.taskCompletion`: Exposes CRUD operations for the **TaskCompletion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskCompletions
    * const taskCompletions = await prisma.taskCompletion.findMany()
    * ```
    */
  get taskCompletion(): Prisma.TaskCompletionDelegate<ExtArgs>;

  /**
   * `prisma.title`: Exposes CRUD operations for the **Title** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Titles
    * const titles = await prisma.title.findMany()
    * ```
    */
  get title(): Prisma.TitleDelegate<ExtArgs>;

  /**
   * `prisma.userTitle`: Exposes CRUD operations for the **UserTitle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTitles
    * const userTitles = await prisma.userTitle.findMany()
    * ```
    */
  get userTitle(): Prisma.UserTitleDelegate<ExtArgs>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs>;

  /**
   * `prisma.articleRead`: Exposes CRUD operations for the **ArticleRead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleReads
    * const articleReads = await prisma.articleRead.findMany()
    * ```
    */
  get articleRead(): Prisma.ArticleReadDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    DailyLog: 'DailyLog',
    TaskCompletion: 'TaskCompletion',
    Title: 'Title',
    UserTitle: 'UserTitle',
    Article: 'Article',
    ArticleRead: 'ArticleRead'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "dailyLog" | "taskCompletion" | "title" | "userTitle" | "article" | "articleRead"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      DailyLog: {
        payload: Prisma.$DailyLogPayload<ExtArgs>
        fields: Prisma.DailyLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          findFirst: {
            args: Prisma.DailyLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          findMany: {
            args: Prisma.DailyLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>[]
          }
          create: {
            args: Prisma.DailyLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          createMany: {
            args: Prisma.DailyLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>[]
          }
          delete: {
            args: Prisma.DailyLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          update: {
            args: Prisma.DailyLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          deleteMany: {
            args: Prisma.DailyLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          aggregate: {
            args: Prisma.DailyLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyLog>
          }
          groupBy: {
            args: Prisma.DailyLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyLogCountArgs<ExtArgs>
            result: $Utils.Optional<DailyLogCountAggregateOutputType> | number
          }
        }
      }
      TaskCompletion: {
        payload: Prisma.$TaskCompletionPayload<ExtArgs>
        fields: Prisma.TaskCompletionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskCompletionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskCompletionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          findFirst: {
            args: Prisma.TaskCompletionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskCompletionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          findMany: {
            args: Prisma.TaskCompletionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          create: {
            args: Prisma.TaskCompletionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          createMany: {
            args: Prisma.TaskCompletionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCompletionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          delete: {
            args: Prisma.TaskCompletionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          update: {
            args: Prisma.TaskCompletionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          deleteMany: {
            args: Prisma.TaskCompletionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskCompletionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskCompletionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          aggregate: {
            args: Prisma.TaskCompletionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskCompletion>
          }
          groupBy: {
            args: Prisma.TaskCompletionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskCompletionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCompletionCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCompletionCountAggregateOutputType> | number
          }
        }
      }
      Title: {
        payload: Prisma.$TitlePayload<ExtArgs>
        fields: Prisma.TitleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TitleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TitleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>
          }
          findFirst: {
            args: Prisma.TitleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TitleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>
          }
          findMany: {
            args: Prisma.TitleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>[]
          }
          create: {
            args: Prisma.TitleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>
          }
          createMany: {
            args: Prisma.TitleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TitleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>[]
          }
          delete: {
            args: Prisma.TitleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>
          }
          update: {
            args: Prisma.TitleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>
          }
          deleteMany: {
            args: Prisma.TitleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TitleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TitleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TitlePayload>
          }
          aggregate: {
            args: Prisma.TitleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTitle>
          }
          groupBy: {
            args: Prisma.TitleGroupByArgs<ExtArgs>
            result: $Utils.Optional<TitleGroupByOutputType>[]
          }
          count: {
            args: Prisma.TitleCountArgs<ExtArgs>
            result: $Utils.Optional<TitleCountAggregateOutputType> | number
          }
        }
      }
      UserTitle: {
        payload: Prisma.$UserTitlePayload<ExtArgs>
        fields: Prisma.UserTitleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserTitleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserTitleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>
          }
          findFirst: {
            args: Prisma.UserTitleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserTitleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>
          }
          findMany: {
            args: Prisma.UserTitleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>[]
          }
          create: {
            args: Prisma.UserTitleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>
          }
          createMany: {
            args: Prisma.UserTitleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserTitleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>[]
          }
          delete: {
            args: Prisma.UserTitleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>
          }
          update: {
            args: Prisma.UserTitleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>
          }
          deleteMany: {
            args: Prisma.UserTitleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserTitleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserTitleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserTitlePayload>
          }
          aggregate: {
            args: Prisma.UserTitleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserTitle>
          }
          groupBy: {
            args: Prisma.UserTitleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserTitleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserTitleCountArgs<ExtArgs>
            result: $Utils.Optional<UserTitleCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      ArticleRead: {
        payload: Prisma.$ArticleReadPayload<ExtArgs>
        fields: Prisma.ArticleReadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleReadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleReadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>
          }
          findFirst: {
            args: Prisma.ArticleReadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleReadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>
          }
          findMany: {
            args: Prisma.ArticleReadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>[]
          }
          create: {
            args: Prisma.ArticleReadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>
          }
          createMany: {
            args: Prisma.ArticleReadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleReadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>[]
          }
          delete: {
            args: Prisma.ArticleReadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>
          }
          update: {
            args: Prisma.ArticleReadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>
          }
          deleteMany: {
            args: Prisma.ArticleReadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleReadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleReadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleReadPayload>
          }
          aggregate: {
            args: Prisma.ArticleReadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleRead>
          }
          groupBy: {
            args: Prisma.ArticleReadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleReadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleReadCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleReadCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    dailyLogs: number
    titles: number
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyLogs?: boolean | UserCountOutputTypeCountDailyLogsArgs
    titles?: boolean | UserCountOutputTypeCountTitlesArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDailyLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTitlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTitleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type DailyLogCountOutputType
   */

  export type DailyLogCountOutputType = {
    tasks: number
  }

  export type DailyLogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | DailyLogCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * DailyLogCountOutputType without action
   */
  export type DailyLogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLogCountOutputType
     */
    select?: DailyLogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DailyLogCountOutputType without action
   */
  export type DailyLogCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
  }


  /**
   * Count Type TitleCountOutputType
   */

  export type TitleCountOutputType = {
    users: number
  }

  export type TitleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TitleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * TitleCountOutputType without action
   */
  export type TitleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TitleCountOutputType
     */
    select?: TitleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TitleCountOutputType without action
   */
  export type TitleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTitleWhereInput
  }


  /**
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    reads: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reads?: boolean | ArticleCountOutputTypeCountReadsArgs
  }

  // Custom InputTypes
  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountReadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleReadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    totalXp: number | null
    currentStreak: number | null
    longestStreak: number | null
  }

  export type UserSumAggregateOutputType = {
    totalXp: number | null
    currentStreak: number | null
    longestStreak: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    name: string | null
    image: string | null
    emailVerified: boolean | null
    nativeLanguage: string | null
    targetLanguage: string | null
    country: string | null
    level: $Enums.Level | null
    role: $Enums.UserRole | null
    totalXp: number | null
    currentStreak: number | null
    longestStreak: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    name: string | null
    image: string | null
    emailVerified: boolean | null
    nativeLanguage: string | null
    targetLanguage: string | null
    country: string | null
    level: $Enums.Level | null
    role: $Enums.UserRole | null
    totalXp: number | null
    currentStreak: number | null
    longestStreak: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    displayName: number
    avatarUrl: number
    name: number
    image: number
    emailVerified: number
    nativeLanguage: number
    targetLanguage: number
    country: number
    level: number
    role: number
    totalXp: number
    currentStreak: number
    longestStreak: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    totalXp?: true
    currentStreak?: true
    longestStreak?: true
  }

  export type UserSumAggregateInputType = {
    totalXp?: true
    currentStreak?: true
    longestStreak?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    name?: true
    image?: true
    emailVerified?: true
    nativeLanguage?: true
    targetLanguage?: true
    country?: true
    level?: true
    role?: true
    totalXp?: true
    currentStreak?: true
    longestStreak?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    name?: true
    image?: true
    emailVerified?: true
    nativeLanguage?: true
    targetLanguage?: true
    country?: true
    level?: true
    role?: true
    totalXp?: true
    currentStreak?: true
    longestStreak?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    name?: true
    image?: true
    emailVerified?: true
    nativeLanguage?: true
    targetLanguage?: true
    country?: true
    level?: true
    role?: true
    totalXp?: true
    currentStreak?: true
    longestStreak?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string | null
    displayName: string
    avatarUrl: string | null
    name: string | null
    image: string | null
    emailVerified: boolean
    nativeLanguage: string
    targetLanguage: string
    country: string | null
    level: $Enums.Level | null
    role: $Enums.UserRole
    totalXp: number
    currentStreak: number
    longestStreak: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    name?: boolean
    image?: boolean
    emailVerified?: boolean
    nativeLanguage?: boolean
    targetLanguage?: boolean
    country?: boolean
    level?: boolean
    role?: boolean
    totalXp?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dailyLogs?: boolean | User$dailyLogsArgs<ExtArgs>
    titles?: boolean | User$titlesArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    name?: boolean
    image?: boolean
    emailVerified?: boolean
    nativeLanguage?: boolean
    targetLanguage?: boolean
    country?: boolean
    level?: boolean
    role?: boolean
    totalXp?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    name?: boolean
    image?: boolean
    emailVerified?: boolean
    nativeLanguage?: boolean
    targetLanguage?: boolean
    country?: boolean
    level?: boolean
    role?: boolean
    totalXp?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyLogs?: boolean | User$dailyLogsArgs<ExtArgs>
    titles?: boolean | User$titlesArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      dailyLogs: Prisma.$DailyLogPayload<ExtArgs>[]
      titles: Prisma.$UserTitlePayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string | null
      displayName: string
      avatarUrl: string | null
      name: string | null
      image: string | null
      emailVerified: boolean
      nativeLanguage: string
      targetLanguage: string
      country: string | null
      level: $Enums.Level | null
      role: $Enums.UserRole
      totalXp: number
      currentStreak: number
      longestStreak: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dailyLogs<T extends User$dailyLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$dailyLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findMany"> | Null>
    titles<T extends User$titlesArgs<ExtArgs> = {}>(args?: Subset<T, User$titlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly nativeLanguage: FieldRef<"User", 'String'>
    readonly targetLanguage: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly level: FieldRef<"User", 'Level'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly totalXp: FieldRef<"User", 'Int'>
    readonly currentStreak: FieldRef<"User", 'Int'>
    readonly longestStreak: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.dailyLogs
   */
  export type User$dailyLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    where?: DailyLogWhereInput
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    cursor?: DailyLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * User.titles
   */
  export type User$titlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    where?: UserTitleWhereInput
    orderBy?: UserTitleOrderByWithRelationInput | UserTitleOrderByWithRelationInput[]
    cursor?: UserTitleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserTitleScalarFieldEnum | UserTitleScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */ 
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
  }


  /**
   * Model DailyLog
   */

  export type AggregateDailyLog = {
    _count: DailyLogCountAggregateOutputType | null
    _avg: DailyLogAvgAggregateOutputType | null
    _sum: DailyLogSumAggregateOutputType | null
    _min: DailyLogMinAggregateOutputType | null
    _max: DailyLogMaxAggregateOutputType | null
  }

  export type DailyLogAvgAggregateOutputType = {
    totalXp: number | null
  }

  export type DailyLogSumAggregateOutputType = {
    totalXp: number | null
  }

  export type DailyLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    dayRecap: string | null
    aiReview: string | null
    totalXp: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    dayRecap: string | null
    aiReview: string | null
    totalXp: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyLogCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    dayRecap: number
    aiReview: number
    totalXp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyLogAvgAggregateInputType = {
    totalXp?: true
  }

  export type DailyLogSumAggregateInputType = {
    totalXp?: true
  }

  export type DailyLogMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    dayRecap?: true
    aiReview?: true
    totalXp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyLogMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    dayRecap?: true
    aiReview?: true
    totalXp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyLogCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    dayRecap?: true
    aiReview?: true
    totalXp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyLog to aggregate.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyLogs
    **/
    _count?: true | DailyLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyLogMaxAggregateInputType
  }

  export type GetDailyLogAggregateType<T extends DailyLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyLog[P]>
      : GetScalarType<T[P], AggregateDailyLog[P]>
  }




  export type DailyLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyLogWhereInput
    orderBy?: DailyLogOrderByWithAggregationInput | DailyLogOrderByWithAggregationInput[]
    by: DailyLogScalarFieldEnum[] | DailyLogScalarFieldEnum
    having?: DailyLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyLogCountAggregateInputType | true
    _avg?: DailyLogAvgAggregateInputType
    _sum?: DailyLogSumAggregateInputType
    _min?: DailyLogMinAggregateInputType
    _max?: DailyLogMaxAggregateInputType
  }

  export type DailyLogGroupByOutputType = {
    id: string
    userId: string
    date: Date
    dayRecap: string | null
    aiReview: string | null
    totalXp: number
    createdAt: Date
    updatedAt: Date
    _count: DailyLogCountAggregateOutputType | null
    _avg: DailyLogAvgAggregateOutputType | null
    _sum: DailyLogSumAggregateOutputType | null
    _min: DailyLogMinAggregateOutputType | null
    _max: DailyLogMaxAggregateOutputType | null
  }

  type GetDailyLogGroupByPayload<T extends DailyLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyLogGroupByOutputType[P]>
            : GetScalarType<T[P], DailyLogGroupByOutputType[P]>
        }
      >
    >


  export type DailyLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    dayRecap?: boolean
    aiReview?: boolean
    totalXp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | DailyLog$tasksArgs<ExtArgs>
    _count?: boolean | DailyLogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyLog"]>

  export type DailyLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    dayRecap?: boolean
    aiReview?: boolean
    totalXp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyLog"]>

  export type DailyLogSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    dayRecap?: boolean
    aiReview?: boolean
    totalXp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | DailyLog$tasksArgs<ExtArgs>
    _count?: boolean | DailyLogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DailyLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DailyLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tasks: Prisma.$TaskCompletionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      dayRecap: string | null
      aiReview: string | null
      totalXp: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyLog"]>
    composites: {}
  }

  type DailyLogGetPayload<S extends boolean | null | undefined | DailyLogDefaultArgs> = $Result.GetResult<Prisma.$DailyLogPayload, S>

  type DailyLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyLogCountAggregateInputType | true
    }

  export interface DailyLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyLog'], meta: { name: 'DailyLog' } }
    /**
     * Find zero or one DailyLog that matches the filter.
     * @param {DailyLogFindUniqueArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyLogFindUniqueArgs>(args: SelectSubset<T, DailyLogFindUniqueArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyLogFindUniqueOrThrowArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogFindFirstArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyLogFindFirstArgs>(args?: SelectSubset<T, DailyLogFindFirstArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogFindFirstOrThrowArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyLogs
     * const dailyLogs = await prisma.dailyLog.findMany()
     * 
     * // Get first 10 DailyLogs
     * const dailyLogs = await prisma.dailyLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyLogWithIdOnly = await prisma.dailyLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyLogFindManyArgs>(args?: SelectSubset<T, DailyLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyLog.
     * @param {DailyLogCreateArgs} args - Arguments to create a DailyLog.
     * @example
     * // Create one DailyLog
     * const DailyLog = await prisma.dailyLog.create({
     *   data: {
     *     // ... data to create a DailyLog
     *   }
     * })
     * 
     */
    create<T extends DailyLogCreateArgs>(args: SelectSubset<T, DailyLogCreateArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyLogs.
     * @param {DailyLogCreateManyArgs} args - Arguments to create many DailyLogs.
     * @example
     * // Create many DailyLogs
     * const dailyLog = await prisma.dailyLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyLogCreateManyArgs>(args?: SelectSubset<T, DailyLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyLogs and returns the data saved in the database.
     * @param {DailyLogCreateManyAndReturnArgs} args - Arguments to create many DailyLogs.
     * @example
     * // Create many DailyLogs
     * const dailyLog = await prisma.dailyLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyLogs and only return the `id`
     * const dailyLogWithIdOnly = await prisma.dailyLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyLogCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyLog.
     * @param {DailyLogDeleteArgs} args - Arguments to delete one DailyLog.
     * @example
     * // Delete one DailyLog
     * const DailyLog = await prisma.dailyLog.delete({
     *   where: {
     *     // ... filter to delete one DailyLog
     *   }
     * })
     * 
     */
    delete<T extends DailyLogDeleteArgs>(args: SelectSubset<T, DailyLogDeleteArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyLog.
     * @param {DailyLogUpdateArgs} args - Arguments to update one DailyLog.
     * @example
     * // Update one DailyLog
     * const dailyLog = await prisma.dailyLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyLogUpdateArgs>(args: SelectSubset<T, DailyLogUpdateArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyLogs.
     * @param {DailyLogDeleteManyArgs} args - Arguments to filter DailyLogs to delete.
     * @example
     * // Delete a few DailyLogs
     * const { count } = await prisma.dailyLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyLogDeleteManyArgs>(args?: SelectSubset<T, DailyLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyLogs
     * const dailyLog = await prisma.dailyLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyLogUpdateManyArgs>(args: SelectSubset<T, DailyLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyLog.
     * @param {DailyLogUpsertArgs} args - Arguments to update or create a DailyLog.
     * @example
     * // Update or create a DailyLog
     * const dailyLog = await prisma.dailyLog.upsert({
     *   create: {
     *     // ... data to create a DailyLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyLog we want to update
     *   }
     * })
     */
    upsert<T extends DailyLogUpsertArgs>(args: SelectSubset<T, DailyLogUpsertArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogCountArgs} args - Arguments to filter DailyLogs to count.
     * @example
     * // Count the number of DailyLogs
     * const count = await prisma.dailyLog.count({
     *   where: {
     *     // ... the filter for the DailyLogs we want to count
     *   }
     * })
    **/
    count<T extends DailyLogCountArgs>(
      args?: Subset<T, DailyLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyLogAggregateArgs>(args: Subset<T, DailyLogAggregateArgs>): Prisma.PrismaPromise<GetDailyLogAggregateType<T>>

    /**
     * Group by DailyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyLogGroupByArgs['orderBy'] }
        : { orderBy?: DailyLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyLog model
   */
  readonly fields: DailyLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tasks<T extends DailyLog$tasksArgs<ExtArgs> = {}>(args?: Subset<T, DailyLog$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyLog model
   */ 
  interface DailyLogFieldRefs {
    readonly id: FieldRef<"DailyLog", 'String'>
    readonly userId: FieldRef<"DailyLog", 'String'>
    readonly date: FieldRef<"DailyLog", 'DateTime'>
    readonly dayRecap: FieldRef<"DailyLog", 'String'>
    readonly aiReview: FieldRef<"DailyLog", 'String'>
    readonly totalXp: FieldRef<"DailyLog", 'Int'>
    readonly createdAt: FieldRef<"DailyLog", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyLog findUnique
   */
  export type DailyLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog findUniqueOrThrow
   */
  export type DailyLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog findFirst
   */
  export type DailyLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyLogs.
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyLogs.
     */
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * DailyLog findFirstOrThrow
   */
  export type DailyLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyLogs.
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyLogs.
     */
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * DailyLog findMany
   */
  export type DailyLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * Filter, which DailyLogs to fetch.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyLogs.
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * DailyLog create
   */
  export type DailyLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyLog.
     */
    data: XOR<DailyLogCreateInput, DailyLogUncheckedCreateInput>
  }

  /**
   * DailyLog createMany
   */
  export type DailyLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyLogs.
     */
    data: DailyLogCreateManyInput | DailyLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyLog createManyAndReturn
   */
  export type DailyLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyLogs.
     */
    data: DailyLogCreateManyInput | DailyLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyLog update
   */
  export type DailyLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyLog.
     */
    data: XOR<DailyLogUpdateInput, DailyLogUncheckedUpdateInput>
    /**
     * Choose, which DailyLog to update.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog updateMany
   */
  export type DailyLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyLogs.
     */
    data: XOR<DailyLogUpdateManyMutationInput, DailyLogUncheckedUpdateManyInput>
    /**
     * Filter which DailyLogs to update
     */
    where?: DailyLogWhereInput
  }

  /**
   * DailyLog upsert
   */
  export type DailyLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyLog to update in case it exists.
     */
    where: DailyLogWhereUniqueInput
    /**
     * In case the DailyLog found by the `where` argument doesn't exist, create a new DailyLog with this data.
     */
    create: XOR<DailyLogCreateInput, DailyLogUncheckedCreateInput>
    /**
     * In case the DailyLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyLogUpdateInput, DailyLogUncheckedUpdateInput>
  }

  /**
   * DailyLog delete
   */
  export type DailyLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
    /**
     * Filter which DailyLog to delete.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog deleteMany
   */
  export type DailyLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyLogs to delete
     */
    where?: DailyLogWhereInput
  }

  /**
   * DailyLog.tasks
   */
  export type DailyLog$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    cursor?: TaskCompletionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * DailyLog without action
   */
  export type DailyLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyLogInclude<ExtArgs> | null
  }


  /**
   * Model TaskCompletion
   */

  export type AggregateTaskCompletion = {
    _count: TaskCompletionCountAggregateOutputType | null
    _avg: TaskCompletionAvgAggregateOutputType | null
    _sum: TaskCompletionSumAggregateOutputType | null
    _min: TaskCompletionMinAggregateOutputType | null
    _max: TaskCompletionMaxAggregateOutputType | null
  }

  export type TaskCompletionAvgAggregateOutputType = {
    xpEarned: number | null
  }

  export type TaskCompletionSumAggregateOutputType = {
    xpEarned: number | null
  }

  export type TaskCompletionMinAggregateOutputType = {
    id: string | null
    dailyLogId: string | null
    taskType: $Enums.TaskType | null
    completed: boolean | null
    completedAt: Date | null
    xpEarned: number | null
  }

  export type TaskCompletionMaxAggregateOutputType = {
    id: string | null
    dailyLogId: string | null
    taskType: $Enums.TaskType | null
    completed: boolean | null
    completedAt: Date | null
    xpEarned: number | null
  }

  export type TaskCompletionCountAggregateOutputType = {
    id: number
    dailyLogId: number
    taskType: number
    completed: number
    completedAt: number
    xpEarned: number
    metadata: number
    _all: number
  }


  export type TaskCompletionAvgAggregateInputType = {
    xpEarned?: true
  }

  export type TaskCompletionSumAggregateInputType = {
    xpEarned?: true
  }

  export type TaskCompletionMinAggregateInputType = {
    id?: true
    dailyLogId?: true
    taskType?: true
    completed?: true
    completedAt?: true
    xpEarned?: true
  }

  export type TaskCompletionMaxAggregateInputType = {
    id?: true
    dailyLogId?: true
    taskType?: true
    completed?: true
    completedAt?: true
    xpEarned?: true
  }

  export type TaskCompletionCountAggregateInputType = {
    id?: true
    dailyLogId?: true
    taskType?: true
    completed?: true
    completedAt?: true
    xpEarned?: true
    metadata?: true
    _all?: true
  }

  export type TaskCompletionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCompletion to aggregate.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskCompletions
    **/
    _count?: true | TaskCompletionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskCompletionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskCompletionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskCompletionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskCompletionMaxAggregateInputType
  }

  export type GetTaskCompletionAggregateType<T extends TaskCompletionAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskCompletion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskCompletion[P]>
      : GetScalarType<T[P], AggregateTaskCompletion[P]>
  }




  export type TaskCompletionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithAggregationInput | TaskCompletionOrderByWithAggregationInput[]
    by: TaskCompletionScalarFieldEnum[] | TaskCompletionScalarFieldEnum
    having?: TaskCompletionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCompletionCountAggregateInputType | true
    _avg?: TaskCompletionAvgAggregateInputType
    _sum?: TaskCompletionSumAggregateInputType
    _min?: TaskCompletionMinAggregateInputType
    _max?: TaskCompletionMaxAggregateInputType
  }

  export type TaskCompletionGroupByOutputType = {
    id: string
    dailyLogId: string
    taskType: $Enums.TaskType
    completed: boolean
    completedAt: Date | null
    xpEarned: number
    metadata: JsonValue | null
    _count: TaskCompletionCountAggregateOutputType | null
    _avg: TaskCompletionAvgAggregateOutputType | null
    _sum: TaskCompletionSumAggregateOutputType | null
    _min: TaskCompletionMinAggregateOutputType | null
    _max: TaskCompletionMaxAggregateOutputType | null
  }

  type GetTaskCompletionGroupByPayload<T extends TaskCompletionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskCompletionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskCompletionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskCompletionGroupByOutputType[P]>
            : GetScalarType<T[P], TaskCompletionGroupByOutputType[P]>
        }
      >
    >


  export type TaskCompletionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dailyLogId?: boolean
    taskType?: boolean
    completed?: boolean
    completedAt?: boolean
    xpEarned?: boolean
    metadata?: boolean
    dailyLog?: boolean | DailyLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dailyLogId?: boolean
    taskType?: boolean
    completed?: boolean
    completedAt?: boolean
    xpEarned?: boolean
    metadata?: boolean
    dailyLog?: boolean | DailyLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectScalar = {
    id?: boolean
    dailyLogId?: boolean
    taskType?: boolean
    completed?: boolean
    completedAt?: boolean
    xpEarned?: boolean
    metadata?: boolean
  }

  export type TaskCompletionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyLog?: boolean | DailyLogDefaultArgs<ExtArgs>
  }
  export type TaskCompletionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyLog?: boolean | DailyLogDefaultArgs<ExtArgs>
  }

  export type $TaskCompletionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskCompletion"
    objects: {
      dailyLog: Prisma.$DailyLogPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dailyLogId: string
      taskType: $Enums.TaskType
      completed: boolean
      completedAt: Date | null
      xpEarned: number
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["taskCompletion"]>
    composites: {}
  }

  type TaskCompletionGetPayload<S extends boolean | null | undefined | TaskCompletionDefaultArgs> = $Result.GetResult<Prisma.$TaskCompletionPayload, S>

  type TaskCompletionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskCompletionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCompletionCountAggregateInputType | true
    }

  export interface TaskCompletionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskCompletion'], meta: { name: 'TaskCompletion' } }
    /**
     * Find zero or one TaskCompletion that matches the filter.
     * @param {TaskCompletionFindUniqueArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskCompletionFindUniqueArgs>(args: SelectSubset<T, TaskCompletionFindUniqueArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskCompletion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskCompletionFindUniqueOrThrowArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskCompletionFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskCompletionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskCompletion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindFirstArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskCompletionFindFirstArgs>(args?: SelectSubset<T, TaskCompletionFindFirstArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskCompletion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindFirstOrThrowArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskCompletionFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskCompletionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskCompletions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskCompletions
     * const taskCompletions = await prisma.taskCompletion.findMany()
     * 
     * // Get first 10 TaskCompletions
     * const taskCompletions = await prisma.taskCompletion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskCompletionFindManyArgs>(args?: SelectSubset<T, TaskCompletionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskCompletion.
     * @param {TaskCompletionCreateArgs} args - Arguments to create a TaskCompletion.
     * @example
     * // Create one TaskCompletion
     * const TaskCompletion = await prisma.taskCompletion.create({
     *   data: {
     *     // ... data to create a TaskCompletion
     *   }
     * })
     * 
     */
    create<T extends TaskCompletionCreateArgs>(args: SelectSubset<T, TaskCompletionCreateArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskCompletions.
     * @param {TaskCompletionCreateManyArgs} args - Arguments to create many TaskCompletions.
     * @example
     * // Create many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCompletionCreateManyArgs>(args?: SelectSubset<T, TaskCompletionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskCompletions and returns the data saved in the database.
     * @param {TaskCompletionCreateManyAndReturnArgs} args - Arguments to create many TaskCompletions.
     * @example
     * // Create many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskCompletions and only return the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCompletionCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCompletionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TaskCompletion.
     * @param {TaskCompletionDeleteArgs} args - Arguments to delete one TaskCompletion.
     * @example
     * // Delete one TaskCompletion
     * const TaskCompletion = await prisma.taskCompletion.delete({
     *   where: {
     *     // ... filter to delete one TaskCompletion
     *   }
     * })
     * 
     */
    delete<T extends TaskCompletionDeleteArgs>(args: SelectSubset<T, TaskCompletionDeleteArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskCompletion.
     * @param {TaskCompletionUpdateArgs} args - Arguments to update one TaskCompletion.
     * @example
     * // Update one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskCompletionUpdateArgs>(args: SelectSubset<T, TaskCompletionUpdateArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskCompletions.
     * @param {TaskCompletionDeleteManyArgs} args - Arguments to filter TaskCompletions to delete.
     * @example
     * // Delete a few TaskCompletions
     * const { count } = await prisma.taskCompletion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskCompletionDeleteManyArgs>(args?: SelectSubset<T, TaskCompletionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskCompletionUpdateManyArgs>(args: SelectSubset<T, TaskCompletionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskCompletion.
     * @param {TaskCompletionUpsertArgs} args - Arguments to update or create a TaskCompletion.
     * @example
     * // Update or create a TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.upsert({
     *   create: {
     *     // ... data to create a TaskCompletion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskCompletion we want to update
     *   }
     * })
     */
    upsert<T extends TaskCompletionUpsertArgs>(args: SelectSubset<T, TaskCompletionUpsertArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionCountArgs} args - Arguments to filter TaskCompletions to count.
     * @example
     * // Count the number of TaskCompletions
     * const count = await prisma.taskCompletion.count({
     *   where: {
     *     // ... the filter for the TaskCompletions we want to count
     *   }
     * })
    **/
    count<T extends TaskCompletionCountArgs>(
      args?: Subset<T, TaskCompletionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCompletionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskCompletionAggregateArgs>(args: Subset<T, TaskCompletionAggregateArgs>): Prisma.PrismaPromise<GetTaskCompletionAggregateType<T>>

    /**
     * Group by TaskCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskCompletionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskCompletionGroupByArgs['orderBy'] }
        : { orderBy?: TaskCompletionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskCompletionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskCompletionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskCompletion model
   */
  readonly fields: TaskCompletionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskCompletion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskCompletionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dailyLog<T extends DailyLogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DailyLogDefaultArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskCompletion model
   */ 
  interface TaskCompletionFieldRefs {
    readonly id: FieldRef<"TaskCompletion", 'String'>
    readonly dailyLogId: FieldRef<"TaskCompletion", 'String'>
    readonly taskType: FieldRef<"TaskCompletion", 'TaskType'>
    readonly completed: FieldRef<"TaskCompletion", 'Boolean'>
    readonly completedAt: FieldRef<"TaskCompletion", 'DateTime'>
    readonly xpEarned: FieldRef<"TaskCompletion", 'Int'>
    readonly metadata: FieldRef<"TaskCompletion", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * TaskCompletion findUnique
   */
  export type TaskCompletionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion findUniqueOrThrow
   */
  export type TaskCompletionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion findFirst
   */
  export type TaskCompletionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion findFirstOrThrow
   */
  export type TaskCompletionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion findMany
   */
  export type TaskCompletionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletions to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion create
   */
  export type TaskCompletionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskCompletion.
     */
    data: XOR<TaskCompletionCreateInput, TaskCompletionUncheckedCreateInput>
  }

  /**
   * TaskCompletion createMany
   */
  export type TaskCompletionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskCompletions.
     */
    data: TaskCompletionCreateManyInput | TaskCompletionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskCompletion createManyAndReturn
   */
  export type TaskCompletionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TaskCompletions.
     */
    data: TaskCompletionCreateManyInput | TaskCompletionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCompletion update
   */
  export type TaskCompletionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskCompletion.
     */
    data: XOR<TaskCompletionUpdateInput, TaskCompletionUncheckedUpdateInput>
    /**
     * Choose, which TaskCompletion to update.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion updateMany
   */
  export type TaskCompletionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskCompletions.
     */
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyInput>
    /**
     * Filter which TaskCompletions to update
     */
    where?: TaskCompletionWhereInput
  }

  /**
   * TaskCompletion upsert
   */
  export type TaskCompletionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskCompletion to update in case it exists.
     */
    where: TaskCompletionWhereUniqueInput
    /**
     * In case the TaskCompletion found by the `where` argument doesn't exist, create a new TaskCompletion with this data.
     */
    create: XOR<TaskCompletionCreateInput, TaskCompletionUncheckedCreateInput>
    /**
     * In case the TaskCompletion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskCompletionUpdateInput, TaskCompletionUncheckedUpdateInput>
  }

  /**
   * TaskCompletion delete
   */
  export type TaskCompletionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter which TaskCompletion to delete.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion deleteMany
   */
  export type TaskCompletionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCompletions to delete
     */
    where?: TaskCompletionWhereInput
  }

  /**
   * TaskCompletion without action
   */
  export type TaskCompletionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
  }


  /**
   * Model Title
   */

  export type AggregateTitle = {
    _count: TitleCountAggregateOutputType | null
    _min: TitleMinAggregateOutputType | null
    _max: TitleMaxAggregateOutputType | null
  }

  export type TitleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    requirement: string | null
  }

  export type TitleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    requirement: string | null
  }

  export type TitleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    icon: number
    requirement: number
    _all: number
  }


  export type TitleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    requirement?: true
  }

  export type TitleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    requirement?: true
  }

  export type TitleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    requirement?: true
    _all?: true
  }

  export type TitleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Title to aggregate.
     */
    where?: TitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Titles to fetch.
     */
    orderBy?: TitleOrderByWithRelationInput | TitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Titles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Titles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Titles
    **/
    _count?: true | TitleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TitleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TitleMaxAggregateInputType
  }

  export type GetTitleAggregateType<T extends TitleAggregateArgs> = {
        [P in keyof T & keyof AggregateTitle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTitle[P]>
      : GetScalarType<T[P], AggregateTitle[P]>
  }




  export type TitleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TitleWhereInput
    orderBy?: TitleOrderByWithAggregationInput | TitleOrderByWithAggregationInput[]
    by: TitleScalarFieldEnum[] | TitleScalarFieldEnum
    having?: TitleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TitleCountAggregateInputType | true
    _min?: TitleMinAggregateInputType
    _max?: TitleMaxAggregateInputType
  }

  export type TitleGroupByOutputType = {
    id: string
    name: string
    description: string
    icon: string
    requirement: string
    _count: TitleCountAggregateOutputType | null
    _min: TitleMinAggregateOutputType | null
    _max: TitleMaxAggregateOutputType | null
  }

  type GetTitleGroupByPayload<T extends TitleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TitleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TitleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TitleGroupByOutputType[P]>
            : GetScalarType<T[P], TitleGroupByOutputType[P]>
        }
      >
    >


  export type TitleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    requirement?: boolean
    users?: boolean | Title$usersArgs<ExtArgs>
    _count?: boolean | TitleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["title"]>

  export type TitleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    requirement?: boolean
  }, ExtArgs["result"]["title"]>

  export type TitleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    requirement?: boolean
  }

  export type TitleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Title$usersArgs<ExtArgs>
    _count?: boolean | TitleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TitleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TitlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Title"
    objects: {
      users: Prisma.$UserTitlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      icon: string
      requirement: string
    }, ExtArgs["result"]["title"]>
    composites: {}
  }

  type TitleGetPayload<S extends boolean | null | undefined | TitleDefaultArgs> = $Result.GetResult<Prisma.$TitlePayload, S>

  type TitleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TitleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TitleCountAggregateInputType | true
    }

  export interface TitleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Title'], meta: { name: 'Title' } }
    /**
     * Find zero or one Title that matches the filter.
     * @param {TitleFindUniqueArgs} args - Arguments to find a Title
     * @example
     * // Get one Title
     * const title = await prisma.title.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TitleFindUniqueArgs>(args: SelectSubset<T, TitleFindUniqueArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Title that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TitleFindUniqueOrThrowArgs} args - Arguments to find a Title
     * @example
     * // Get one Title
     * const title = await prisma.title.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TitleFindUniqueOrThrowArgs>(args: SelectSubset<T, TitleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Title that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleFindFirstArgs} args - Arguments to find a Title
     * @example
     * // Get one Title
     * const title = await prisma.title.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TitleFindFirstArgs>(args?: SelectSubset<T, TitleFindFirstArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Title that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleFindFirstOrThrowArgs} args - Arguments to find a Title
     * @example
     * // Get one Title
     * const title = await prisma.title.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TitleFindFirstOrThrowArgs>(args?: SelectSubset<T, TitleFindFirstOrThrowArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Titles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Titles
     * const titles = await prisma.title.findMany()
     * 
     * // Get first 10 Titles
     * const titles = await prisma.title.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const titleWithIdOnly = await prisma.title.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TitleFindManyArgs>(args?: SelectSubset<T, TitleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Title.
     * @param {TitleCreateArgs} args - Arguments to create a Title.
     * @example
     * // Create one Title
     * const Title = await prisma.title.create({
     *   data: {
     *     // ... data to create a Title
     *   }
     * })
     * 
     */
    create<T extends TitleCreateArgs>(args: SelectSubset<T, TitleCreateArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Titles.
     * @param {TitleCreateManyArgs} args - Arguments to create many Titles.
     * @example
     * // Create many Titles
     * const title = await prisma.title.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TitleCreateManyArgs>(args?: SelectSubset<T, TitleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Titles and returns the data saved in the database.
     * @param {TitleCreateManyAndReturnArgs} args - Arguments to create many Titles.
     * @example
     * // Create many Titles
     * const title = await prisma.title.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Titles and only return the `id`
     * const titleWithIdOnly = await prisma.title.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TitleCreateManyAndReturnArgs>(args?: SelectSubset<T, TitleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Title.
     * @param {TitleDeleteArgs} args - Arguments to delete one Title.
     * @example
     * // Delete one Title
     * const Title = await prisma.title.delete({
     *   where: {
     *     // ... filter to delete one Title
     *   }
     * })
     * 
     */
    delete<T extends TitleDeleteArgs>(args: SelectSubset<T, TitleDeleteArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Title.
     * @param {TitleUpdateArgs} args - Arguments to update one Title.
     * @example
     * // Update one Title
     * const title = await prisma.title.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TitleUpdateArgs>(args: SelectSubset<T, TitleUpdateArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Titles.
     * @param {TitleDeleteManyArgs} args - Arguments to filter Titles to delete.
     * @example
     * // Delete a few Titles
     * const { count } = await prisma.title.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TitleDeleteManyArgs>(args?: SelectSubset<T, TitleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Titles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Titles
     * const title = await prisma.title.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TitleUpdateManyArgs>(args: SelectSubset<T, TitleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Title.
     * @param {TitleUpsertArgs} args - Arguments to update or create a Title.
     * @example
     * // Update or create a Title
     * const title = await prisma.title.upsert({
     *   create: {
     *     // ... data to create a Title
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Title we want to update
     *   }
     * })
     */
    upsert<T extends TitleUpsertArgs>(args: SelectSubset<T, TitleUpsertArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Titles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleCountArgs} args - Arguments to filter Titles to count.
     * @example
     * // Count the number of Titles
     * const count = await prisma.title.count({
     *   where: {
     *     // ... the filter for the Titles we want to count
     *   }
     * })
    **/
    count<T extends TitleCountArgs>(
      args?: Subset<T, TitleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TitleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Title.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TitleAggregateArgs>(args: Subset<T, TitleAggregateArgs>): Prisma.PrismaPromise<GetTitleAggregateType<T>>

    /**
     * Group by Title.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TitleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TitleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TitleGroupByArgs['orderBy'] }
        : { orderBy?: TitleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TitleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTitleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Title model
   */
  readonly fields: TitleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Title.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TitleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Title$usersArgs<ExtArgs> = {}>(args?: Subset<T, Title$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Title model
   */ 
  interface TitleFieldRefs {
    readonly id: FieldRef<"Title", 'String'>
    readonly name: FieldRef<"Title", 'String'>
    readonly description: FieldRef<"Title", 'String'>
    readonly icon: FieldRef<"Title", 'String'>
    readonly requirement: FieldRef<"Title", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Title findUnique
   */
  export type TitleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * Filter, which Title to fetch.
     */
    where: TitleWhereUniqueInput
  }

  /**
   * Title findUniqueOrThrow
   */
  export type TitleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * Filter, which Title to fetch.
     */
    where: TitleWhereUniqueInput
  }

  /**
   * Title findFirst
   */
  export type TitleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * Filter, which Title to fetch.
     */
    where?: TitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Titles to fetch.
     */
    orderBy?: TitleOrderByWithRelationInput | TitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Titles.
     */
    cursor?: TitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Titles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Titles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Titles.
     */
    distinct?: TitleScalarFieldEnum | TitleScalarFieldEnum[]
  }

  /**
   * Title findFirstOrThrow
   */
  export type TitleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * Filter, which Title to fetch.
     */
    where?: TitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Titles to fetch.
     */
    orderBy?: TitleOrderByWithRelationInput | TitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Titles.
     */
    cursor?: TitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Titles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Titles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Titles.
     */
    distinct?: TitleScalarFieldEnum | TitleScalarFieldEnum[]
  }

  /**
   * Title findMany
   */
  export type TitleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * Filter, which Titles to fetch.
     */
    where?: TitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Titles to fetch.
     */
    orderBy?: TitleOrderByWithRelationInput | TitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Titles.
     */
    cursor?: TitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Titles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Titles.
     */
    skip?: number
    distinct?: TitleScalarFieldEnum | TitleScalarFieldEnum[]
  }

  /**
   * Title create
   */
  export type TitleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * The data needed to create a Title.
     */
    data: XOR<TitleCreateInput, TitleUncheckedCreateInput>
  }

  /**
   * Title createMany
   */
  export type TitleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Titles.
     */
    data: TitleCreateManyInput | TitleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Title createManyAndReturn
   */
  export type TitleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Titles.
     */
    data: TitleCreateManyInput | TitleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Title update
   */
  export type TitleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * The data needed to update a Title.
     */
    data: XOR<TitleUpdateInput, TitleUncheckedUpdateInput>
    /**
     * Choose, which Title to update.
     */
    where: TitleWhereUniqueInput
  }

  /**
   * Title updateMany
   */
  export type TitleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Titles.
     */
    data: XOR<TitleUpdateManyMutationInput, TitleUncheckedUpdateManyInput>
    /**
     * Filter which Titles to update
     */
    where?: TitleWhereInput
  }

  /**
   * Title upsert
   */
  export type TitleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * The filter to search for the Title to update in case it exists.
     */
    where: TitleWhereUniqueInput
    /**
     * In case the Title found by the `where` argument doesn't exist, create a new Title with this data.
     */
    create: XOR<TitleCreateInput, TitleUncheckedCreateInput>
    /**
     * In case the Title was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TitleUpdateInput, TitleUncheckedUpdateInput>
  }

  /**
   * Title delete
   */
  export type TitleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
    /**
     * Filter which Title to delete.
     */
    where: TitleWhereUniqueInput
  }

  /**
   * Title deleteMany
   */
  export type TitleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Titles to delete
     */
    where?: TitleWhereInput
  }

  /**
   * Title.users
   */
  export type Title$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    where?: UserTitleWhereInput
    orderBy?: UserTitleOrderByWithRelationInput | UserTitleOrderByWithRelationInput[]
    cursor?: UserTitleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserTitleScalarFieldEnum | UserTitleScalarFieldEnum[]
  }

  /**
   * Title without action
   */
  export type TitleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Title
     */
    select?: TitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TitleInclude<ExtArgs> | null
  }


  /**
   * Model UserTitle
   */

  export type AggregateUserTitle = {
    _count: UserTitleCountAggregateOutputType | null
    _min: UserTitleMinAggregateOutputType | null
    _max: UserTitleMaxAggregateOutputType | null
  }

  export type UserTitleMinAggregateOutputType = {
    id: string | null
    userId: string | null
    titleId: string | null
    earnedAt: Date | null
  }

  export type UserTitleMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    titleId: string | null
    earnedAt: Date | null
  }

  export type UserTitleCountAggregateOutputType = {
    id: number
    userId: number
    titleId: number
    earnedAt: number
    _all: number
  }


  export type UserTitleMinAggregateInputType = {
    id?: true
    userId?: true
    titleId?: true
    earnedAt?: true
  }

  export type UserTitleMaxAggregateInputType = {
    id?: true
    userId?: true
    titleId?: true
    earnedAt?: true
  }

  export type UserTitleCountAggregateInputType = {
    id?: true
    userId?: true
    titleId?: true
    earnedAt?: true
    _all?: true
  }

  export type UserTitleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserTitle to aggregate.
     */
    where?: UserTitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTitles to fetch.
     */
    orderBy?: UserTitleOrderByWithRelationInput | UserTitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserTitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTitles
    **/
    _count?: true | UserTitleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTitleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTitleMaxAggregateInputType
  }

  export type GetUserTitleAggregateType<T extends UserTitleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserTitle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserTitle[P]>
      : GetScalarType<T[P], AggregateUserTitle[P]>
  }




  export type UserTitleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserTitleWhereInput
    orderBy?: UserTitleOrderByWithAggregationInput | UserTitleOrderByWithAggregationInput[]
    by: UserTitleScalarFieldEnum[] | UserTitleScalarFieldEnum
    having?: UserTitleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTitleCountAggregateInputType | true
    _min?: UserTitleMinAggregateInputType
    _max?: UserTitleMaxAggregateInputType
  }

  export type UserTitleGroupByOutputType = {
    id: string
    userId: string
    titleId: string
    earnedAt: Date
    _count: UserTitleCountAggregateOutputType | null
    _min: UserTitleMinAggregateOutputType | null
    _max: UserTitleMaxAggregateOutputType | null
  }

  type GetUserTitleGroupByPayload<T extends UserTitleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserTitleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTitleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTitleGroupByOutputType[P]>
            : GetScalarType<T[P], UserTitleGroupByOutputType[P]>
        }
      >
    >


  export type UserTitleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    titleId?: boolean
    earnedAt?: boolean
    title?: boolean | TitleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userTitle"]>

  export type UserTitleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    titleId?: boolean
    earnedAt?: boolean
    title?: boolean | TitleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userTitle"]>

  export type UserTitleSelectScalar = {
    id?: boolean
    userId?: boolean
    titleId?: boolean
    earnedAt?: boolean
  }

  export type UserTitleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    title?: boolean | TitleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserTitleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    title?: boolean | TitleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserTitlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserTitle"
    objects: {
      title: Prisma.$TitlePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      titleId: string
      earnedAt: Date
    }, ExtArgs["result"]["userTitle"]>
    composites: {}
  }

  type UserTitleGetPayload<S extends boolean | null | undefined | UserTitleDefaultArgs> = $Result.GetResult<Prisma.$UserTitlePayload, S>

  type UserTitleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserTitleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserTitleCountAggregateInputType | true
    }

  export interface UserTitleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserTitle'], meta: { name: 'UserTitle' } }
    /**
     * Find zero or one UserTitle that matches the filter.
     * @param {UserTitleFindUniqueArgs} args - Arguments to find a UserTitle
     * @example
     * // Get one UserTitle
     * const userTitle = await prisma.userTitle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserTitleFindUniqueArgs>(args: SelectSubset<T, UserTitleFindUniqueArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserTitle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserTitleFindUniqueOrThrowArgs} args - Arguments to find a UserTitle
     * @example
     * // Get one UserTitle
     * const userTitle = await prisma.userTitle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserTitleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserTitleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserTitle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleFindFirstArgs} args - Arguments to find a UserTitle
     * @example
     * // Get one UserTitle
     * const userTitle = await prisma.userTitle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserTitleFindFirstArgs>(args?: SelectSubset<T, UserTitleFindFirstArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserTitle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleFindFirstOrThrowArgs} args - Arguments to find a UserTitle
     * @example
     * // Get one UserTitle
     * const userTitle = await prisma.userTitle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserTitleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserTitleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserTitles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTitles
     * const userTitles = await prisma.userTitle.findMany()
     * 
     * // Get first 10 UserTitles
     * const userTitles = await prisma.userTitle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userTitleWithIdOnly = await prisma.userTitle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserTitleFindManyArgs>(args?: SelectSubset<T, UserTitleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserTitle.
     * @param {UserTitleCreateArgs} args - Arguments to create a UserTitle.
     * @example
     * // Create one UserTitle
     * const UserTitle = await prisma.userTitle.create({
     *   data: {
     *     // ... data to create a UserTitle
     *   }
     * })
     * 
     */
    create<T extends UserTitleCreateArgs>(args: SelectSubset<T, UserTitleCreateArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserTitles.
     * @param {UserTitleCreateManyArgs} args - Arguments to create many UserTitles.
     * @example
     * // Create many UserTitles
     * const userTitle = await prisma.userTitle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserTitleCreateManyArgs>(args?: SelectSubset<T, UserTitleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserTitles and returns the data saved in the database.
     * @param {UserTitleCreateManyAndReturnArgs} args - Arguments to create many UserTitles.
     * @example
     * // Create many UserTitles
     * const userTitle = await prisma.userTitle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserTitles and only return the `id`
     * const userTitleWithIdOnly = await prisma.userTitle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserTitleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserTitleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserTitle.
     * @param {UserTitleDeleteArgs} args - Arguments to delete one UserTitle.
     * @example
     * // Delete one UserTitle
     * const UserTitle = await prisma.userTitle.delete({
     *   where: {
     *     // ... filter to delete one UserTitle
     *   }
     * })
     * 
     */
    delete<T extends UserTitleDeleteArgs>(args: SelectSubset<T, UserTitleDeleteArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserTitle.
     * @param {UserTitleUpdateArgs} args - Arguments to update one UserTitle.
     * @example
     * // Update one UserTitle
     * const userTitle = await prisma.userTitle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserTitleUpdateArgs>(args: SelectSubset<T, UserTitleUpdateArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserTitles.
     * @param {UserTitleDeleteManyArgs} args - Arguments to filter UserTitles to delete.
     * @example
     * // Delete a few UserTitles
     * const { count } = await prisma.userTitle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserTitleDeleteManyArgs>(args?: SelectSubset<T, UserTitleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTitles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTitles
     * const userTitle = await prisma.userTitle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserTitleUpdateManyArgs>(args: SelectSubset<T, UserTitleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserTitle.
     * @param {UserTitleUpsertArgs} args - Arguments to update or create a UserTitle.
     * @example
     * // Update or create a UserTitle
     * const userTitle = await prisma.userTitle.upsert({
     *   create: {
     *     // ... data to create a UserTitle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserTitle we want to update
     *   }
     * })
     */
    upsert<T extends UserTitleUpsertArgs>(args: SelectSubset<T, UserTitleUpsertArgs<ExtArgs>>): Prisma__UserTitleClient<$Result.GetResult<Prisma.$UserTitlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserTitles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleCountArgs} args - Arguments to filter UserTitles to count.
     * @example
     * // Count the number of UserTitles
     * const count = await prisma.userTitle.count({
     *   where: {
     *     // ... the filter for the UserTitles we want to count
     *   }
     * })
    **/
    count<T extends UserTitleCountArgs>(
      args?: Subset<T, UserTitleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTitleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserTitle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTitleAggregateArgs>(args: Subset<T, UserTitleAggregateArgs>): Prisma.PrismaPromise<GetUserTitleAggregateType<T>>

    /**
     * Group by UserTitle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTitleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTitleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTitleGroupByArgs['orderBy'] }
        : { orderBy?: UserTitleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTitleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTitleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserTitle model
   */
  readonly fields: UserTitleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserTitle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserTitleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    title<T extends TitleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TitleDefaultArgs<ExtArgs>>): Prisma__TitleClient<$Result.GetResult<Prisma.$TitlePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserTitle model
   */ 
  interface UserTitleFieldRefs {
    readonly id: FieldRef<"UserTitle", 'String'>
    readonly userId: FieldRef<"UserTitle", 'String'>
    readonly titleId: FieldRef<"UserTitle", 'String'>
    readonly earnedAt: FieldRef<"UserTitle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserTitle findUnique
   */
  export type UserTitleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * Filter, which UserTitle to fetch.
     */
    where: UserTitleWhereUniqueInput
  }

  /**
   * UserTitle findUniqueOrThrow
   */
  export type UserTitleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * Filter, which UserTitle to fetch.
     */
    where: UserTitleWhereUniqueInput
  }

  /**
   * UserTitle findFirst
   */
  export type UserTitleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * Filter, which UserTitle to fetch.
     */
    where?: UserTitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTitles to fetch.
     */
    orderBy?: UserTitleOrderByWithRelationInput | UserTitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTitles.
     */
    cursor?: UserTitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTitles.
     */
    distinct?: UserTitleScalarFieldEnum | UserTitleScalarFieldEnum[]
  }

  /**
   * UserTitle findFirstOrThrow
   */
  export type UserTitleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * Filter, which UserTitle to fetch.
     */
    where?: UserTitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTitles to fetch.
     */
    orderBy?: UserTitleOrderByWithRelationInput | UserTitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTitles.
     */
    cursor?: UserTitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTitles.
     */
    distinct?: UserTitleScalarFieldEnum | UserTitleScalarFieldEnum[]
  }

  /**
   * UserTitle findMany
   */
  export type UserTitleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * Filter, which UserTitles to fetch.
     */
    where?: UserTitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTitles to fetch.
     */
    orderBy?: UserTitleOrderByWithRelationInput | UserTitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTitles.
     */
    cursor?: UserTitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTitles.
     */
    skip?: number
    distinct?: UserTitleScalarFieldEnum | UserTitleScalarFieldEnum[]
  }

  /**
   * UserTitle create
   */
  export type UserTitleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserTitle.
     */
    data: XOR<UserTitleCreateInput, UserTitleUncheckedCreateInput>
  }

  /**
   * UserTitle createMany
   */
  export type UserTitleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserTitles.
     */
    data: UserTitleCreateManyInput | UserTitleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserTitle createManyAndReturn
   */
  export type UserTitleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserTitles.
     */
    data: UserTitleCreateManyInput | UserTitleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserTitle update
   */
  export type UserTitleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserTitle.
     */
    data: XOR<UserTitleUpdateInput, UserTitleUncheckedUpdateInput>
    /**
     * Choose, which UserTitle to update.
     */
    where: UserTitleWhereUniqueInput
  }

  /**
   * UserTitle updateMany
   */
  export type UserTitleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserTitles.
     */
    data: XOR<UserTitleUpdateManyMutationInput, UserTitleUncheckedUpdateManyInput>
    /**
     * Filter which UserTitles to update
     */
    where?: UserTitleWhereInput
  }

  /**
   * UserTitle upsert
   */
  export type UserTitleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserTitle to update in case it exists.
     */
    where: UserTitleWhereUniqueInput
    /**
     * In case the UserTitle found by the `where` argument doesn't exist, create a new UserTitle with this data.
     */
    create: XOR<UserTitleCreateInput, UserTitleUncheckedCreateInput>
    /**
     * In case the UserTitle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserTitleUpdateInput, UserTitleUncheckedUpdateInput>
  }

  /**
   * UserTitle delete
   */
  export type UserTitleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
    /**
     * Filter which UserTitle to delete.
     */
    where: UserTitleWhereUniqueInput
  }

  /**
   * UserTitle deleteMany
   */
  export type UserTitleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserTitles to delete
     */
    where?: UserTitleWhereInput
  }

  /**
   * UserTitle without action
   */
  export type UserTitleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserTitle
     */
    select?: UserTitleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserTitleInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleAvgAggregateOutputType = {
    readTime: number | null
  }

  export type ArticleSumAggregateOutputType = {
    readTime: number | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    summary: string | null
    content: string | null
    coverImage: string | null
    readTime: number | null
    category: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    summary: string | null
    content: string | null
    coverImage: string | null
    readTime: number | null
    category: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    summary: number
    content: number
    coverImage: number
    readTime: number
    category: number
    tags: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleAvgAggregateInputType = {
    readTime?: true
  }

  export type ArticleSumAggregateInputType = {
    readTime?: true
  }

  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    summary?: true
    content?: true
    coverImage?: true
    readTime?: true
    category?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    summary?: true
    content?: true
    coverImage?: true
    readTime?: true
    category?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    summary?: true
    content?: true
    coverImage?: true
    readTime?: true
    category?: true
    tags?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _avg?: ArticleAvgAggregateInputType
    _sum?: ArticleSumAggregateInputType
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage: string | null
    readTime: number
    category: string
    tags: string[]
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    summary?: boolean
    content?: boolean
    coverImage?: boolean
    readTime?: boolean
    category?: boolean
    tags?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reads?: boolean | Article$readsArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    summary?: boolean
    content?: boolean
    coverImage?: boolean
    readTime?: boolean
    category?: boolean
    tags?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    summary?: boolean
    content?: boolean
    coverImage?: boolean
    readTime?: boolean
    category?: boolean
    tags?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reads?: boolean | Article$readsArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      reads: Prisma.$ArticleReadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      summary: string
      content: string
      coverImage: string | null
      readTime: number
      category: string
      tags: string[]
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reads<T extends Article$readsArgs<ExtArgs> = {}>(args?: Subset<T, Article$readsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Article model
   */ 
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly slug: FieldRef<"Article", 'String'>
    readonly summary: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly coverImage: FieldRef<"Article", 'String'>
    readonly readTime: FieldRef<"Article", 'Int'>
    readonly category: FieldRef<"Article", 'String'>
    readonly tags: FieldRef<"Article", 'String[]'>
    readonly published: FieldRef<"Article", 'Boolean'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
  }

  /**
   * Article.reads
   */
  export type Article$readsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    where?: ArticleReadWhereInput
    orderBy?: ArticleReadOrderByWithRelationInput | ArticleReadOrderByWithRelationInput[]
    cursor?: ArticleReadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleReadScalarFieldEnum | ArticleReadScalarFieldEnum[]
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model ArticleRead
   */

  export type AggregateArticleRead = {
    _count: ArticleReadCountAggregateOutputType | null
    _avg: ArticleReadAvgAggregateOutputType | null
    _sum: ArticleReadSumAggregateOutputType | null
    _min: ArticleReadMinAggregateOutputType | null
    _max: ArticleReadMaxAggregateOutputType | null
  }

  export type ArticleReadAvgAggregateOutputType = {
    xpEarned: number | null
  }

  export type ArticleReadSumAggregateOutputType = {
    xpEarned: number | null
  }

  export type ArticleReadMinAggregateOutputType = {
    id: string | null
    userId: string | null
    articleId: string | null
    date: Date | null
    completed: boolean | null
    completedAt: Date | null
    xpEarned: number | null
    createdAt: Date | null
  }

  export type ArticleReadMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    articleId: string | null
    date: Date | null
    completed: boolean | null
    completedAt: Date | null
    xpEarned: number | null
    createdAt: Date | null
  }

  export type ArticleReadCountAggregateOutputType = {
    id: number
    userId: number
    articleId: number
    date: number
    completed: number
    completedAt: number
    xpEarned: number
    createdAt: number
    _all: number
  }


  export type ArticleReadAvgAggregateInputType = {
    xpEarned?: true
  }

  export type ArticleReadSumAggregateInputType = {
    xpEarned?: true
  }

  export type ArticleReadMinAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    date?: true
    completed?: true
    completedAt?: true
    xpEarned?: true
    createdAt?: true
  }

  export type ArticleReadMaxAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    date?: true
    completed?: true
    completedAt?: true
    xpEarned?: true
    createdAt?: true
  }

  export type ArticleReadCountAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    date?: true
    completed?: true
    completedAt?: true
    xpEarned?: true
    createdAt?: true
    _all?: true
  }

  export type ArticleReadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleRead to aggregate.
     */
    where?: ArticleReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleReads to fetch.
     */
    orderBy?: ArticleReadOrderByWithRelationInput | ArticleReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleReads
    **/
    _count?: true | ArticleReadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleReadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleReadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleReadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleReadMaxAggregateInputType
  }

  export type GetArticleReadAggregateType<T extends ArticleReadAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleRead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleRead[P]>
      : GetScalarType<T[P], AggregateArticleRead[P]>
  }




  export type ArticleReadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleReadWhereInput
    orderBy?: ArticleReadOrderByWithAggregationInput | ArticleReadOrderByWithAggregationInput[]
    by: ArticleReadScalarFieldEnum[] | ArticleReadScalarFieldEnum
    having?: ArticleReadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleReadCountAggregateInputType | true
    _avg?: ArticleReadAvgAggregateInputType
    _sum?: ArticleReadSumAggregateInputType
    _min?: ArticleReadMinAggregateInputType
    _max?: ArticleReadMaxAggregateInputType
  }

  export type ArticleReadGroupByOutputType = {
    id: string
    userId: string
    articleId: string
    date: Date
    completed: boolean
    completedAt: Date | null
    xpEarned: number
    createdAt: Date
    _count: ArticleReadCountAggregateOutputType | null
    _avg: ArticleReadAvgAggregateOutputType | null
    _sum: ArticleReadSumAggregateOutputType | null
    _min: ArticleReadMinAggregateOutputType | null
    _max: ArticleReadMaxAggregateOutputType | null
  }

  type GetArticleReadGroupByPayload<T extends ArticleReadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleReadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleReadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleReadGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleReadGroupByOutputType[P]>
        }
      >
    >


  export type ArticleReadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    date?: boolean
    completed?: boolean
    completedAt?: boolean
    xpEarned?: boolean
    createdAt?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleRead"]>

  export type ArticleReadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    date?: boolean
    completed?: boolean
    completedAt?: boolean
    xpEarned?: boolean
    createdAt?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleRead"]>

  export type ArticleReadSelectScalar = {
    id?: boolean
    userId?: boolean
    articleId?: boolean
    date?: boolean
    completed?: boolean
    completedAt?: boolean
    xpEarned?: boolean
    createdAt?: boolean
  }

  export type ArticleReadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }
  export type ArticleReadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }

  export type $ArticleReadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleRead"
    objects: {
      article: Prisma.$ArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      articleId: string
      date: Date
      completed: boolean
      completedAt: Date | null
      xpEarned: number
      createdAt: Date
    }, ExtArgs["result"]["articleRead"]>
    composites: {}
  }

  type ArticleReadGetPayload<S extends boolean | null | undefined | ArticleReadDefaultArgs> = $Result.GetResult<Prisma.$ArticleReadPayload, S>

  type ArticleReadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleReadFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleReadCountAggregateInputType | true
    }

  export interface ArticleReadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleRead'], meta: { name: 'ArticleRead' } }
    /**
     * Find zero or one ArticleRead that matches the filter.
     * @param {ArticleReadFindUniqueArgs} args - Arguments to find a ArticleRead
     * @example
     * // Get one ArticleRead
     * const articleRead = await prisma.articleRead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleReadFindUniqueArgs>(args: SelectSubset<T, ArticleReadFindUniqueArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ArticleRead that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ArticleReadFindUniqueOrThrowArgs} args - Arguments to find a ArticleRead
     * @example
     * // Get one ArticleRead
     * const articleRead = await prisma.articleRead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleReadFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleReadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ArticleRead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadFindFirstArgs} args - Arguments to find a ArticleRead
     * @example
     * // Get one ArticleRead
     * const articleRead = await prisma.articleRead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleReadFindFirstArgs>(args?: SelectSubset<T, ArticleReadFindFirstArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ArticleRead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadFindFirstOrThrowArgs} args - Arguments to find a ArticleRead
     * @example
     * // Get one ArticleRead
     * const articleRead = await prisma.articleRead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleReadFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleReadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ArticleReads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleReads
     * const articleReads = await prisma.articleRead.findMany()
     * 
     * // Get first 10 ArticleReads
     * const articleReads = await prisma.articleRead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleReadWithIdOnly = await prisma.articleRead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleReadFindManyArgs>(args?: SelectSubset<T, ArticleReadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ArticleRead.
     * @param {ArticleReadCreateArgs} args - Arguments to create a ArticleRead.
     * @example
     * // Create one ArticleRead
     * const ArticleRead = await prisma.articleRead.create({
     *   data: {
     *     // ... data to create a ArticleRead
     *   }
     * })
     * 
     */
    create<T extends ArticleReadCreateArgs>(args: SelectSubset<T, ArticleReadCreateArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ArticleReads.
     * @param {ArticleReadCreateManyArgs} args - Arguments to create many ArticleReads.
     * @example
     * // Create many ArticleReads
     * const articleRead = await prisma.articleRead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleReadCreateManyArgs>(args?: SelectSubset<T, ArticleReadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleReads and returns the data saved in the database.
     * @param {ArticleReadCreateManyAndReturnArgs} args - Arguments to create many ArticleReads.
     * @example
     * // Create many ArticleReads
     * const articleRead = await prisma.articleRead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleReads and only return the `id`
     * const articleReadWithIdOnly = await prisma.articleRead.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleReadCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleReadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ArticleRead.
     * @param {ArticleReadDeleteArgs} args - Arguments to delete one ArticleRead.
     * @example
     * // Delete one ArticleRead
     * const ArticleRead = await prisma.articleRead.delete({
     *   where: {
     *     // ... filter to delete one ArticleRead
     *   }
     * })
     * 
     */
    delete<T extends ArticleReadDeleteArgs>(args: SelectSubset<T, ArticleReadDeleteArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ArticleRead.
     * @param {ArticleReadUpdateArgs} args - Arguments to update one ArticleRead.
     * @example
     * // Update one ArticleRead
     * const articleRead = await prisma.articleRead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleReadUpdateArgs>(args: SelectSubset<T, ArticleReadUpdateArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ArticleReads.
     * @param {ArticleReadDeleteManyArgs} args - Arguments to filter ArticleReads to delete.
     * @example
     * // Delete a few ArticleReads
     * const { count } = await prisma.articleRead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleReadDeleteManyArgs>(args?: SelectSubset<T, ArticleReadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleReads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleReads
     * const articleRead = await prisma.articleRead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleReadUpdateManyArgs>(args: SelectSubset<T, ArticleReadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleRead.
     * @param {ArticleReadUpsertArgs} args - Arguments to update or create a ArticleRead.
     * @example
     * // Update or create a ArticleRead
     * const articleRead = await prisma.articleRead.upsert({
     *   create: {
     *     // ... data to create a ArticleRead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleRead we want to update
     *   }
     * })
     */
    upsert<T extends ArticleReadUpsertArgs>(args: SelectSubset<T, ArticleReadUpsertArgs<ExtArgs>>): Prisma__ArticleReadClient<$Result.GetResult<Prisma.$ArticleReadPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ArticleReads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadCountArgs} args - Arguments to filter ArticleReads to count.
     * @example
     * // Count the number of ArticleReads
     * const count = await prisma.articleRead.count({
     *   where: {
     *     // ... the filter for the ArticleReads we want to count
     *   }
     * })
    **/
    count<T extends ArticleReadCountArgs>(
      args?: Subset<T, ArticleReadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleReadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleRead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleReadAggregateArgs>(args: Subset<T, ArticleReadAggregateArgs>): Prisma.PrismaPromise<GetArticleReadAggregateType<T>>

    /**
     * Group by ArticleRead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleReadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleReadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleReadGroupByArgs['orderBy'] }
        : { orderBy?: ArticleReadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleReadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleReadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleRead model
   */
  readonly fields: ArticleReadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleRead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleReadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArticleRead model
   */ 
  interface ArticleReadFieldRefs {
    readonly id: FieldRef<"ArticleRead", 'String'>
    readonly userId: FieldRef<"ArticleRead", 'String'>
    readonly articleId: FieldRef<"ArticleRead", 'String'>
    readonly date: FieldRef<"ArticleRead", 'DateTime'>
    readonly completed: FieldRef<"ArticleRead", 'Boolean'>
    readonly completedAt: FieldRef<"ArticleRead", 'DateTime'>
    readonly xpEarned: FieldRef<"ArticleRead", 'Int'>
    readonly createdAt: FieldRef<"ArticleRead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleRead findUnique
   */
  export type ArticleReadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * Filter, which ArticleRead to fetch.
     */
    where: ArticleReadWhereUniqueInput
  }

  /**
   * ArticleRead findUniqueOrThrow
   */
  export type ArticleReadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * Filter, which ArticleRead to fetch.
     */
    where: ArticleReadWhereUniqueInput
  }

  /**
   * ArticleRead findFirst
   */
  export type ArticleReadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * Filter, which ArticleRead to fetch.
     */
    where?: ArticleReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleReads to fetch.
     */
    orderBy?: ArticleReadOrderByWithRelationInput | ArticleReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleReads.
     */
    cursor?: ArticleReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleReads.
     */
    distinct?: ArticleReadScalarFieldEnum | ArticleReadScalarFieldEnum[]
  }

  /**
   * ArticleRead findFirstOrThrow
   */
  export type ArticleReadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * Filter, which ArticleRead to fetch.
     */
    where?: ArticleReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleReads to fetch.
     */
    orderBy?: ArticleReadOrderByWithRelationInput | ArticleReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleReads.
     */
    cursor?: ArticleReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleReads.
     */
    distinct?: ArticleReadScalarFieldEnum | ArticleReadScalarFieldEnum[]
  }

  /**
   * ArticleRead findMany
   */
  export type ArticleReadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * Filter, which ArticleReads to fetch.
     */
    where?: ArticleReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleReads to fetch.
     */
    orderBy?: ArticleReadOrderByWithRelationInput | ArticleReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleReads.
     */
    cursor?: ArticleReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleReads.
     */
    skip?: number
    distinct?: ArticleReadScalarFieldEnum | ArticleReadScalarFieldEnum[]
  }

  /**
   * ArticleRead create
   */
  export type ArticleReadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleRead.
     */
    data: XOR<ArticleReadCreateInput, ArticleReadUncheckedCreateInput>
  }

  /**
   * ArticleRead createMany
   */
  export type ArticleReadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleReads.
     */
    data: ArticleReadCreateManyInput | ArticleReadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleRead createManyAndReturn
   */
  export type ArticleReadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ArticleReads.
     */
    data: ArticleReadCreateManyInput | ArticleReadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleRead update
   */
  export type ArticleReadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleRead.
     */
    data: XOR<ArticleReadUpdateInput, ArticleReadUncheckedUpdateInput>
    /**
     * Choose, which ArticleRead to update.
     */
    where: ArticleReadWhereUniqueInput
  }

  /**
   * ArticleRead updateMany
   */
  export type ArticleReadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleReads.
     */
    data: XOR<ArticleReadUpdateManyMutationInput, ArticleReadUncheckedUpdateManyInput>
    /**
     * Filter which ArticleReads to update
     */
    where?: ArticleReadWhereInput
  }

  /**
   * ArticleRead upsert
   */
  export type ArticleReadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleRead to update in case it exists.
     */
    where: ArticleReadWhereUniqueInput
    /**
     * In case the ArticleRead found by the `where` argument doesn't exist, create a new ArticleRead with this data.
     */
    create: XOR<ArticleReadCreateInput, ArticleReadUncheckedCreateInput>
    /**
     * In case the ArticleRead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleReadUpdateInput, ArticleReadUncheckedUpdateInput>
  }

  /**
   * ArticleRead delete
   */
  export type ArticleReadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
    /**
     * Filter which ArticleRead to delete.
     */
    where: ArticleReadWhereUniqueInput
  }

  /**
   * ArticleRead deleteMany
   */
  export type ArticleReadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleReads to delete
     */
    where?: ArticleReadWhereInput
  }

  /**
   * ArticleRead without action
   */
  export type ArticleReadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleRead
     */
    select?: ArticleReadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleReadInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    name: 'name',
    image: 'image',
    emailVerified: 'emailVerified',
    nativeLanguage: 'nativeLanguage',
    targetLanguage: 'targetLanguage',
    country: 'country',
    level: 'level',
    role: 'role',
    totalXp: 'totalXp',
    currentStreak: 'currentStreak',
    longestStreak: 'longestStreak',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const DailyLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    dayRecap: 'dayRecap',
    aiReview: 'aiReview',
    totalXp: 'totalXp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyLogScalarFieldEnum = (typeof DailyLogScalarFieldEnum)[keyof typeof DailyLogScalarFieldEnum]


  export const TaskCompletionScalarFieldEnum: {
    id: 'id',
    dailyLogId: 'dailyLogId',
    taskType: 'taskType',
    completed: 'completed',
    completedAt: 'completedAt',
    xpEarned: 'xpEarned',
    metadata: 'metadata'
  };

  export type TaskCompletionScalarFieldEnum = (typeof TaskCompletionScalarFieldEnum)[keyof typeof TaskCompletionScalarFieldEnum]


  export const TitleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    icon: 'icon',
    requirement: 'requirement'
  };

  export type TitleScalarFieldEnum = (typeof TitleScalarFieldEnum)[keyof typeof TitleScalarFieldEnum]


  export const UserTitleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    titleId: 'titleId',
    earnedAt: 'earnedAt'
  };

  export type UserTitleScalarFieldEnum = (typeof UserTitleScalarFieldEnum)[keyof typeof UserTitleScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    summary: 'summary',
    content: 'content',
    coverImage: 'coverImage',
    readTime: 'readTime',
    category: 'category',
    tags: 'tags',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const ArticleReadScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    articleId: 'articleId',
    date: 'date',
    completed: 'completed',
    completedAt: 'completedAt',
    xpEarned: 'xpEarned',
    createdAt: 'createdAt'
  };

  export type ArticleReadScalarFieldEnum = (typeof ArticleReadScalarFieldEnum)[keyof typeof ArticleReadScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Level'
   */
  export type EnumLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Level'>
    


  /**
   * Reference to a field of type 'Level[]'
   */
  export type ListEnumLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Level[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TaskType'
   */
  export type EnumTaskTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskType'>
    


  /**
   * Reference to a field of type 'TaskType[]'
   */
  export type ListEnumTaskTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringNullableFilter<"User"> | string | null
    displayName?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    nativeLanguage?: StringFilter<"User"> | string
    targetLanguage?: StringFilter<"User"> | string
    country?: StringNullableFilter<"User"> | string | null
    level?: EnumLevelNullableFilter<"User"> | $Enums.Level | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    totalXp?: IntFilter<"User"> | number
    currentStreak?: IntFilter<"User"> | number
    longestStreak?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    dailyLogs?: DailyLogListRelationFilter
    titles?: UserTitleListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    nativeLanguage?: SortOrder
    targetLanguage?: SortOrder
    country?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    role?: SortOrder
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dailyLogs?: DailyLogOrderByRelationAggregateInput
    titles?: UserTitleOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringNullableFilter<"User"> | string | null
    displayName?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    nativeLanguage?: StringFilter<"User"> | string
    targetLanguage?: StringFilter<"User"> | string
    country?: StringNullableFilter<"User"> | string | null
    level?: EnumLevelNullableFilter<"User"> | $Enums.Level | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    totalXp?: IntFilter<"User"> | number
    currentStreak?: IntFilter<"User"> | number
    longestStreak?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    dailyLogs?: DailyLogListRelationFilter
    titles?: UserTitleListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    nativeLanguage?: SortOrder
    targetLanguage?: SortOrder
    country?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    role?: SortOrder
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayName?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    nativeLanguage?: StringWithAggregatesFilter<"User"> | string
    targetLanguage?: StringWithAggregatesFilter<"User"> | string
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    level?: EnumLevelNullableWithAggregatesFilter<"User"> | $Enums.Level | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    totalXp?: IntWithAggregatesFilter<"User"> | number
    currentStreak?: IntWithAggregatesFilter<"User"> | number
    longestStreak?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type DailyLogWhereInput = {
    AND?: DailyLogWhereInput | DailyLogWhereInput[]
    OR?: DailyLogWhereInput[]
    NOT?: DailyLogWhereInput | DailyLogWhereInput[]
    id?: StringFilter<"DailyLog"> | string
    userId?: StringFilter<"DailyLog"> | string
    date?: DateTimeFilter<"DailyLog"> | Date | string
    dayRecap?: StringNullableFilter<"DailyLog"> | string | null
    aiReview?: StringNullableFilter<"DailyLog"> | string | null
    totalXp?: IntFilter<"DailyLog"> | number
    createdAt?: DateTimeFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeFilter<"DailyLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tasks?: TaskCompletionListRelationFilter
  }

  export type DailyLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    dayRecap?: SortOrderInput | SortOrder
    aiReview?: SortOrderInput | SortOrder
    totalXp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tasks?: TaskCompletionOrderByRelationAggregateInput
  }

  export type DailyLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: DailyLogUserIdDateCompoundUniqueInput
    AND?: DailyLogWhereInput | DailyLogWhereInput[]
    OR?: DailyLogWhereInput[]
    NOT?: DailyLogWhereInput | DailyLogWhereInput[]
    userId?: StringFilter<"DailyLog"> | string
    date?: DateTimeFilter<"DailyLog"> | Date | string
    dayRecap?: StringNullableFilter<"DailyLog"> | string | null
    aiReview?: StringNullableFilter<"DailyLog"> | string | null
    totalXp?: IntFilter<"DailyLog"> | number
    createdAt?: DateTimeFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeFilter<"DailyLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tasks?: TaskCompletionListRelationFilter
  }, "id" | "userId_date">

  export type DailyLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    dayRecap?: SortOrderInput | SortOrder
    aiReview?: SortOrderInput | SortOrder
    totalXp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyLogCountOrderByAggregateInput
    _avg?: DailyLogAvgOrderByAggregateInput
    _max?: DailyLogMaxOrderByAggregateInput
    _min?: DailyLogMinOrderByAggregateInput
    _sum?: DailyLogSumOrderByAggregateInput
  }

  export type DailyLogScalarWhereWithAggregatesInput = {
    AND?: DailyLogScalarWhereWithAggregatesInput | DailyLogScalarWhereWithAggregatesInput[]
    OR?: DailyLogScalarWhereWithAggregatesInput[]
    NOT?: DailyLogScalarWhereWithAggregatesInput | DailyLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyLog"> | string
    userId?: StringWithAggregatesFilter<"DailyLog"> | string
    date?: DateTimeWithAggregatesFilter<"DailyLog"> | Date | string
    dayRecap?: StringNullableWithAggregatesFilter<"DailyLog"> | string | null
    aiReview?: StringNullableWithAggregatesFilter<"DailyLog"> | string | null
    totalXp?: IntWithAggregatesFilter<"DailyLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyLog"> | Date | string
  }

  export type TaskCompletionWhereInput = {
    AND?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    OR?: TaskCompletionWhereInput[]
    NOT?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    id?: StringFilter<"TaskCompletion"> | string
    dailyLogId?: StringFilter<"TaskCompletion"> | string
    taskType?: EnumTaskTypeFilter<"TaskCompletion"> | $Enums.TaskType
    completed?: BoolFilter<"TaskCompletion"> | boolean
    completedAt?: DateTimeNullableFilter<"TaskCompletion"> | Date | string | null
    xpEarned?: IntFilter<"TaskCompletion"> | number
    metadata?: JsonNullableFilter<"TaskCompletion">
    dailyLog?: XOR<DailyLogRelationFilter, DailyLogWhereInput>
  }

  export type TaskCompletionOrderByWithRelationInput = {
    id?: SortOrder
    dailyLogId?: SortOrder
    taskType?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrderInput | SortOrder
    dailyLog?: DailyLogOrderByWithRelationInput
  }

  export type TaskCompletionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dailyLogId_taskType?: TaskCompletionDailyLogIdTaskTypeCompoundUniqueInput
    AND?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    OR?: TaskCompletionWhereInput[]
    NOT?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    dailyLogId?: StringFilter<"TaskCompletion"> | string
    taskType?: EnumTaskTypeFilter<"TaskCompletion"> | $Enums.TaskType
    completed?: BoolFilter<"TaskCompletion"> | boolean
    completedAt?: DateTimeNullableFilter<"TaskCompletion"> | Date | string | null
    xpEarned?: IntFilter<"TaskCompletion"> | number
    metadata?: JsonNullableFilter<"TaskCompletion">
    dailyLog?: XOR<DailyLogRelationFilter, DailyLogWhereInput>
  }, "id" | "dailyLogId_taskType">

  export type TaskCompletionOrderByWithAggregationInput = {
    id?: SortOrder
    dailyLogId?: SortOrder
    taskType?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: TaskCompletionCountOrderByAggregateInput
    _avg?: TaskCompletionAvgOrderByAggregateInput
    _max?: TaskCompletionMaxOrderByAggregateInput
    _min?: TaskCompletionMinOrderByAggregateInput
    _sum?: TaskCompletionSumOrderByAggregateInput
  }

  export type TaskCompletionScalarWhereWithAggregatesInput = {
    AND?: TaskCompletionScalarWhereWithAggregatesInput | TaskCompletionScalarWhereWithAggregatesInput[]
    OR?: TaskCompletionScalarWhereWithAggregatesInput[]
    NOT?: TaskCompletionScalarWhereWithAggregatesInput | TaskCompletionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskCompletion"> | string
    dailyLogId?: StringWithAggregatesFilter<"TaskCompletion"> | string
    taskType?: EnumTaskTypeWithAggregatesFilter<"TaskCompletion"> | $Enums.TaskType
    completed?: BoolWithAggregatesFilter<"TaskCompletion"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"TaskCompletion"> | Date | string | null
    xpEarned?: IntWithAggregatesFilter<"TaskCompletion"> | number
    metadata?: JsonNullableWithAggregatesFilter<"TaskCompletion">
  }

  export type TitleWhereInput = {
    AND?: TitleWhereInput | TitleWhereInput[]
    OR?: TitleWhereInput[]
    NOT?: TitleWhereInput | TitleWhereInput[]
    id?: StringFilter<"Title"> | string
    name?: StringFilter<"Title"> | string
    description?: StringFilter<"Title"> | string
    icon?: StringFilter<"Title"> | string
    requirement?: StringFilter<"Title"> | string
    users?: UserTitleListRelationFilter
  }

  export type TitleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    requirement?: SortOrder
    users?: UserTitleOrderByRelationAggregateInput
  }

  export type TitleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TitleWhereInput | TitleWhereInput[]
    OR?: TitleWhereInput[]
    NOT?: TitleWhereInput | TitleWhereInput[]
    description?: StringFilter<"Title"> | string
    icon?: StringFilter<"Title"> | string
    requirement?: StringFilter<"Title"> | string
    users?: UserTitleListRelationFilter
  }, "id" | "name">

  export type TitleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    requirement?: SortOrder
    _count?: TitleCountOrderByAggregateInput
    _max?: TitleMaxOrderByAggregateInput
    _min?: TitleMinOrderByAggregateInput
  }

  export type TitleScalarWhereWithAggregatesInput = {
    AND?: TitleScalarWhereWithAggregatesInput | TitleScalarWhereWithAggregatesInput[]
    OR?: TitleScalarWhereWithAggregatesInput[]
    NOT?: TitleScalarWhereWithAggregatesInput | TitleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Title"> | string
    name?: StringWithAggregatesFilter<"Title"> | string
    description?: StringWithAggregatesFilter<"Title"> | string
    icon?: StringWithAggregatesFilter<"Title"> | string
    requirement?: StringWithAggregatesFilter<"Title"> | string
  }

  export type UserTitleWhereInput = {
    AND?: UserTitleWhereInput | UserTitleWhereInput[]
    OR?: UserTitleWhereInput[]
    NOT?: UserTitleWhereInput | UserTitleWhereInput[]
    id?: StringFilter<"UserTitle"> | string
    userId?: StringFilter<"UserTitle"> | string
    titleId?: StringFilter<"UserTitle"> | string
    earnedAt?: DateTimeFilter<"UserTitle"> | Date | string
    title?: XOR<TitleRelationFilter, TitleWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserTitleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    titleId?: SortOrder
    earnedAt?: SortOrder
    title?: TitleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserTitleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_titleId?: UserTitleUserIdTitleIdCompoundUniqueInput
    AND?: UserTitleWhereInput | UserTitleWhereInput[]
    OR?: UserTitleWhereInput[]
    NOT?: UserTitleWhereInput | UserTitleWhereInput[]
    userId?: StringFilter<"UserTitle"> | string
    titleId?: StringFilter<"UserTitle"> | string
    earnedAt?: DateTimeFilter<"UserTitle"> | Date | string
    title?: XOR<TitleRelationFilter, TitleWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_titleId">

  export type UserTitleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    titleId?: SortOrder
    earnedAt?: SortOrder
    _count?: UserTitleCountOrderByAggregateInput
    _max?: UserTitleMaxOrderByAggregateInput
    _min?: UserTitleMinOrderByAggregateInput
  }

  export type UserTitleScalarWhereWithAggregatesInput = {
    AND?: UserTitleScalarWhereWithAggregatesInput | UserTitleScalarWhereWithAggregatesInput[]
    OR?: UserTitleScalarWhereWithAggregatesInput[]
    NOT?: UserTitleScalarWhereWithAggregatesInput | UserTitleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserTitle"> | string
    userId?: StringWithAggregatesFilter<"UserTitle"> | string
    titleId?: StringWithAggregatesFilter<"UserTitle"> | string
    earnedAt?: DateTimeWithAggregatesFilter<"UserTitle"> | Date | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    slug?: StringFilter<"Article"> | string
    summary?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    coverImage?: StringNullableFilter<"Article"> | string | null
    readTime?: IntFilter<"Article"> | number
    category?: StringFilter<"Article"> | string
    tags?: StringNullableListFilter<"Article">
    published?: BoolFilter<"Article"> | boolean
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    reads?: ArticleReadListRelationFilter
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    readTime?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reads?: ArticleReadOrderByRelationAggregateInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    summary?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    coverImage?: StringNullableFilter<"Article"> | string | null
    readTime?: IntFilter<"Article"> | number
    category?: StringFilter<"Article"> | string
    tags?: StringNullableListFilter<"Article">
    published?: BoolFilter<"Article"> | boolean
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    reads?: ArticleReadListRelationFilter
  }, "id" | "slug">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    readTime?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _avg?: ArticleAvgOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
    _sum?: ArticleSumOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    slug?: StringWithAggregatesFilter<"Article"> | string
    summary?: StringWithAggregatesFilter<"Article"> | string
    content?: StringWithAggregatesFilter<"Article"> | string
    coverImage?: StringNullableWithAggregatesFilter<"Article"> | string | null
    readTime?: IntWithAggregatesFilter<"Article"> | number
    category?: StringWithAggregatesFilter<"Article"> | string
    tags?: StringNullableListFilter<"Article">
    published?: BoolWithAggregatesFilter<"Article"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type ArticleReadWhereInput = {
    AND?: ArticleReadWhereInput | ArticleReadWhereInput[]
    OR?: ArticleReadWhereInput[]
    NOT?: ArticleReadWhereInput | ArticleReadWhereInput[]
    id?: StringFilter<"ArticleRead"> | string
    userId?: StringFilter<"ArticleRead"> | string
    articleId?: StringFilter<"ArticleRead"> | string
    date?: DateTimeFilter<"ArticleRead"> | Date | string
    completed?: BoolFilter<"ArticleRead"> | boolean
    completedAt?: DateTimeNullableFilter<"ArticleRead"> | Date | string | null
    xpEarned?: IntFilter<"ArticleRead"> | number
    createdAt?: DateTimeFilter<"ArticleRead"> | Date | string
    article?: XOR<ArticleRelationFilter, ArticleWhereInput>
  }

  export type ArticleReadOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    xpEarned?: SortOrder
    createdAt?: SortOrder
    article?: ArticleOrderByWithRelationInput
  }

  export type ArticleReadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_articleId_date?: ArticleReadUserIdArticleIdDateCompoundUniqueInput
    AND?: ArticleReadWhereInput | ArticleReadWhereInput[]
    OR?: ArticleReadWhereInput[]
    NOT?: ArticleReadWhereInput | ArticleReadWhereInput[]
    userId?: StringFilter<"ArticleRead"> | string
    articleId?: StringFilter<"ArticleRead"> | string
    date?: DateTimeFilter<"ArticleRead"> | Date | string
    completed?: BoolFilter<"ArticleRead"> | boolean
    completedAt?: DateTimeNullableFilter<"ArticleRead"> | Date | string | null
    xpEarned?: IntFilter<"ArticleRead"> | number
    createdAt?: DateTimeFilter<"ArticleRead"> | Date | string
    article?: XOR<ArticleRelationFilter, ArticleWhereInput>
  }, "id" | "userId_articleId_date">

  export type ArticleReadOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    xpEarned?: SortOrder
    createdAt?: SortOrder
    _count?: ArticleReadCountOrderByAggregateInput
    _avg?: ArticleReadAvgOrderByAggregateInput
    _max?: ArticleReadMaxOrderByAggregateInput
    _min?: ArticleReadMinOrderByAggregateInput
    _sum?: ArticleReadSumOrderByAggregateInput
  }

  export type ArticleReadScalarWhereWithAggregatesInput = {
    AND?: ArticleReadScalarWhereWithAggregatesInput | ArticleReadScalarWhereWithAggregatesInput[]
    OR?: ArticleReadScalarWhereWithAggregatesInput[]
    NOT?: ArticleReadScalarWhereWithAggregatesInput | ArticleReadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArticleRead"> | string
    userId?: StringWithAggregatesFilter<"ArticleRead"> | string
    articleId?: StringWithAggregatesFilter<"ArticleRead"> | string
    date?: DateTimeWithAggregatesFilter<"ArticleRead"> | Date | string
    completed?: BoolWithAggregatesFilter<"ArticleRead"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"ArticleRead"> | Date | string | null
    xpEarned?: IntWithAggregatesFilter<"ArticleRead"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ArticleRead"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogCreateNestedManyWithoutUserInput
    titles?: UserTitleCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogUncheckedCreateNestedManyWithoutUserInput
    titles?: UserTitleUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUpdateManyWithoutUserNestedInput
    titles?: UserTitleUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUncheckedUpdateManyWithoutUserNestedInput
    titles?: UserTitleUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DailyLogCreateInput = {
    id?: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDailyLogsInput
    tasks?: TaskCompletionCreateNestedManyWithoutDailyLogInput
  }

  export type DailyLogUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCompletionUncheckedCreateNestedManyWithoutDailyLogInput
  }

  export type DailyLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDailyLogsNestedInput
    tasks?: TaskCompletionUpdateManyWithoutDailyLogNestedInput
  }

  export type DailyLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskCompletionUncheckedUpdateManyWithoutDailyLogNestedInput
  }

  export type DailyLogCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionCreateInput = {
    id?: string
    taskType: $Enums.TaskType
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    dailyLog: DailyLogCreateNestedOneWithoutTasksInput
  }

  export type TaskCompletionUncheckedCreateInput = {
    id?: string
    dailyLogId: string
    taskType: $Enums.TaskType
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    dailyLog?: DailyLogUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskCompletionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dailyLogId?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionCreateManyInput = {
    id?: string
    dailyLogId: string
    taskType: $Enums.TaskType
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dailyLogId?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TitleCreateInput = {
    id?: string
    name: string
    description: string
    icon: string
    requirement: string
    users?: UserTitleCreateNestedManyWithoutTitleInput
  }

  export type TitleUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    icon: string
    requirement: string
    users?: UserTitleUncheckedCreateNestedManyWithoutTitleInput
  }

  export type TitleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
    users?: UserTitleUpdateManyWithoutTitleNestedInput
  }

  export type TitleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
    users?: UserTitleUncheckedUpdateManyWithoutTitleNestedInput
  }

  export type TitleCreateManyInput = {
    id?: string
    name: string
    description: string
    icon: string
    requirement: string
  }

  export type TitleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
  }

  export type TitleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
  }

  export type UserTitleCreateInput = {
    id?: string
    earnedAt?: Date | string
    title: TitleCreateNestedOneWithoutUsersInput
    user: UserCreateNestedOneWithoutTitlesInput
  }

  export type UserTitleUncheckedCreateInput = {
    id?: string
    userId: string
    titleId: string
    earnedAt?: Date | string
  }

  export type UserTitleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: TitleUpdateOneRequiredWithoutUsersNestedInput
    user?: UserUpdateOneRequiredWithoutTitlesNestedInput
  }

  export type UserTitleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    titleId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTitleCreateManyInput = {
    id?: string
    userId: string
    titleId: string
    earnedAt?: Date | string
  }

  export type UserTitleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTitleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    titleId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage?: string | null
    readTime?: number
    category?: string
    tags?: ArticleCreatetagsInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reads?: ArticleReadCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage?: string | null
    readTime?: number
    category?: string
    tags?: ArticleCreatetagsInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reads?: ArticleReadUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reads?: ArticleReadUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reads?: ArticleReadUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage?: string | null
    readTime?: number
    category?: string
    tags?: ArticleCreatetagsInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleReadCreateInput = {
    id?: string
    userId: string
    date: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    createdAt?: Date | string
    article: ArticleCreateNestedOneWithoutReadsInput
  }

  export type ArticleReadUncheckedCreateInput = {
    id?: string
    userId: string
    articleId: string
    date: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    createdAt?: Date | string
  }

  export type ArticleReadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutReadsNestedInput
  }

  export type ArticleReadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleReadCreateManyInput = {
    id?: string
    userId: string
    articleId: string
    date: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    createdAt?: Date | string
  }

  export type ArticleReadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleReadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Level | EnumLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLevelNullableFilter<$PrismaModel> | $Enums.Level | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DailyLogListRelationFilter = {
    every?: DailyLogWhereInput
    some?: DailyLogWhereInput
    none?: DailyLogWhereInput
  }

  export type UserTitleListRelationFilter = {
    every?: UserTitleWhereInput
    some?: UserTitleWhereInput
    none?: UserTitleWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DailyLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserTitleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    name?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    nativeLanguage?: SortOrder
    targetLanguage?: SortOrder
    country?: SortOrder
    level?: SortOrder
    role?: SortOrder
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    name?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    nativeLanguage?: SortOrder
    targetLanguage?: SortOrder
    country?: SortOrder
    level?: SortOrder
    role?: SortOrder
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    name?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    nativeLanguage?: SortOrder
    targetLanguage?: SortOrder
    country?: SortOrder
    level?: SortOrder
    role?: SortOrder
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    totalXp?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Level | EnumLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.Level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumLevelNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionListRelationFilter = {
    every?: TaskCompletionWhereInput
    some?: TaskCompletionWhereInput
    none?: TaskCompletionWhereInput
  }

  export type TaskCompletionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyLogUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type DailyLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    dayRecap?: SortOrder
    aiReview?: SortOrder
    totalXp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyLogAvgOrderByAggregateInput = {
    totalXp?: SortOrder
  }

  export type DailyLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    dayRecap?: SortOrder
    aiReview?: SortOrder
    totalXp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    dayRecap?: SortOrder
    aiReview?: SortOrder
    totalXp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyLogSumOrderByAggregateInput = {
    totalXp?: SortOrder
  }

  export type EnumTaskTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeFilter<$PrismaModel> | $Enums.TaskType
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DailyLogRelationFilter = {
    is?: DailyLogWhereInput
    isNot?: DailyLogWhereInput
  }

  export type TaskCompletionDailyLogIdTaskTypeCompoundUniqueInput = {
    dailyLogId: string
    taskType: $Enums.TaskType
  }

  export type TaskCompletionCountOrderByAggregateInput = {
    id?: SortOrder
    dailyLogId?: SortOrder
    taskType?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    xpEarned?: SortOrder
    metadata?: SortOrder
  }

  export type TaskCompletionAvgOrderByAggregateInput = {
    xpEarned?: SortOrder
  }

  export type TaskCompletionMaxOrderByAggregateInput = {
    id?: SortOrder
    dailyLogId?: SortOrder
    taskType?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    xpEarned?: SortOrder
  }

  export type TaskCompletionMinOrderByAggregateInput = {
    id?: SortOrder
    dailyLogId?: SortOrder
    taskType?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    xpEarned?: SortOrder
  }

  export type TaskCompletionSumOrderByAggregateInput = {
    xpEarned?: SortOrder
  }

  export type EnumTaskTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type TitleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    requirement?: SortOrder
  }

  export type TitleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    requirement?: SortOrder
  }

  export type TitleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    requirement?: SortOrder
  }

  export type TitleRelationFilter = {
    is?: TitleWhereInput
    isNot?: TitleWhereInput
  }

  export type UserTitleUserIdTitleIdCompoundUniqueInput = {
    userId: string
    titleId: string
  }

  export type UserTitleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    titleId?: SortOrder
    earnedAt?: SortOrder
  }

  export type UserTitleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    titleId?: SortOrder
    earnedAt?: SortOrder
  }

  export type UserTitleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    titleId?: SortOrder
    earnedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ArticleReadListRelationFilter = {
    every?: ArticleReadWhereInput
    some?: ArticleReadWhereInput
    none?: ArticleReadWhereInput
  }

  export type ArticleReadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    coverImage?: SortOrder
    readTime?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleAvgOrderByAggregateInput = {
    readTime?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    coverImage?: SortOrder
    readTime?: SortOrder
    category?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    coverImage?: SortOrder
    readTime?: SortOrder
    category?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleSumOrderByAggregateInput = {
    readTime?: SortOrder
  }

  export type ArticleRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type ArticleReadUserIdArticleIdDateCompoundUniqueInput = {
    userId: string
    articleId: string
    date: Date | string
  }

  export type ArticleReadCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    xpEarned?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleReadAvgOrderByAggregateInput = {
    xpEarned?: SortOrder
  }

  export type ArticleReadMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    xpEarned?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleReadMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    xpEarned?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleReadSumOrderByAggregateInput = {
    xpEarned?: SortOrder
  }

  export type DailyLogCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyLogCreateWithoutUserInput, DailyLogUncheckedCreateWithoutUserInput> | DailyLogCreateWithoutUserInput[] | DailyLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyLogCreateOrConnectWithoutUserInput | DailyLogCreateOrConnectWithoutUserInput[]
    createMany?: DailyLogCreateManyUserInputEnvelope
    connect?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
  }

  export type UserTitleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserTitleCreateWithoutUserInput, UserTitleUncheckedCreateWithoutUserInput> | UserTitleCreateWithoutUserInput[] | UserTitleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutUserInput | UserTitleCreateOrConnectWithoutUserInput[]
    createMany?: UserTitleCreateManyUserInputEnvelope
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type DailyLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyLogCreateWithoutUserInput, DailyLogUncheckedCreateWithoutUserInput> | DailyLogCreateWithoutUserInput[] | DailyLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyLogCreateOrConnectWithoutUserInput | DailyLogCreateOrConnectWithoutUserInput[]
    createMany?: DailyLogCreateManyUserInputEnvelope
    connect?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
  }

  export type UserTitleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserTitleCreateWithoutUserInput, UserTitleUncheckedCreateWithoutUserInput> | UserTitleCreateWithoutUserInput[] | UserTitleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutUserInput | UserTitleCreateOrConnectWithoutUserInput[]
    createMany?: UserTitleCreateManyUserInputEnvelope
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumLevelFieldUpdateOperationsInput = {
    set?: $Enums.Level | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DailyLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyLogCreateWithoutUserInput, DailyLogUncheckedCreateWithoutUserInput> | DailyLogCreateWithoutUserInput[] | DailyLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyLogCreateOrConnectWithoutUserInput | DailyLogCreateOrConnectWithoutUserInput[]
    upsert?: DailyLogUpsertWithWhereUniqueWithoutUserInput | DailyLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DailyLogCreateManyUserInputEnvelope
    set?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    disconnect?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    delete?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    connect?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    update?: DailyLogUpdateWithWhereUniqueWithoutUserInput | DailyLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyLogUpdateManyWithWhereWithoutUserInput | DailyLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyLogScalarWhereInput | DailyLogScalarWhereInput[]
  }

  export type UserTitleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserTitleCreateWithoutUserInput, UserTitleUncheckedCreateWithoutUserInput> | UserTitleCreateWithoutUserInput[] | UserTitleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutUserInput | UserTitleCreateOrConnectWithoutUserInput[]
    upsert?: UserTitleUpsertWithWhereUniqueWithoutUserInput | UserTitleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserTitleCreateManyUserInputEnvelope
    set?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    disconnect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    delete?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    update?: UserTitleUpdateWithWhereUniqueWithoutUserInput | UserTitleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserTitleUpdateManyWithWhereWithoutUserInput | UserTitleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserTitleScalarWhereInput | UserTitleScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type DailyLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyLogCreateWithoutUserInput, DailyLogUncheckedCreateWithoutUserInput> | DailyLogCreateWithoutUserInput[] | DailyLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyLogCreateOrConnectWithoutUserInput | DailyLogCreateOrConnectWithoutUserInput[]
    upsert?: DailyLogUpsertWithWhereUniqueWithoutUserInput | DailyLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DailyLogCreateManyUserInputEnvelope
    set?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    disconnect?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    delete?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    connect?: DailyLogWhereUniqueInput | DailyLogWhereUniqueInput[]
    update?: DailyLogUpdateWithWhereUniqueWithoutUserInput | DailyLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyLogUpdateManyWithWhereWithoutUserInput | DailyLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyLogScalarWhereInput | DailyLogScalarWhereInput[]
  }

  export type UserTitleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserTitleCreateWithoutUserInput, UserTitleUncheckedCreateWithoutUserInput> | UserTitleCreateWithoutUserInput[] | UserTitleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutUserInput | UserTitleCreateOrConnectWithoutUserInput[]
    upsert?: UserTitleUpsertWithWhereUniqueWithoutUserInput | UserTitleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserTitleCreateManyUserInputEnvelope
    set?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    disconnect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    delete?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    update?: UserTitleUpdateWithWhereUniqueWithoutUserInput | UserTitleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserTitleUpdateManyWithWhereWithoutUserInput | UserTitleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserTitleScalarWhereInput | UserTitleScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutDailyLogsInput = {
    create?: XOR<UserCreateWithoutDailyLogsInput, UserUncheckedCreateWithoutDailyLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyLogsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCompletionCreateNestedManyWithoutDailyLogInput = {
    create?: XOR<TaskCompletionCreateWithoutDailyLogInput, TaskCompletionUncheckedCreateWithoutDailyLogInput> | TaskCompletionCreateWithoutDailyLogInput[] | TaskCompletionUncheckedCreateWithoutDailyLogInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutDailyLogInput | TaskCompletionCreateOrConnectWithoutDailyLogInput[]
    createMany?: TaskCompletionCreateManyDailyLogInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type TaskCompletionUncheckedCreateNestedManyWithoutDailyLogInput = {
    create?: XOR<TaskCompletionCreateWithoutDailyLogInput, TaskCompletionUncheckedCreateWithoutDailyLogInput> | TaskCompletionCreateWithoutDailyLogInput[] | TaskCompletionUncheckedCreateWithoutDailyLogInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutDailyLogInput | TaskCompletionCreateOrConnectWithoutDailyLogInput[]
    createMany?: TaskCompletionCreateManyDailyLogInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDailyLogsNestedInput = {
    create?: XOR<UserCreateWithoutDailyLogsInput, UserUncheckedCreateWithoutDailyLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyLogsInput
    upsert?: UserUpsertWithoutDailyLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDailyLogsInput, UserUpdateWithoutDailyLogsInput>, UserUncheckedUpdateWithoutDailyLogsInput>
  }

  export type TaskCompletionUpdateManyWithoutDailyLogNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutDailyLogInput, TaskCompletionUncheckedCreateWithoutDailyLogInput> | TaskCompletionCreateWithoutDailyLogInput[] | TaskCompletionUncheckedCreateWithoutDailyLogInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutDailyLogInput | TaskCompletionCreateOrConnectWithoutDailyLogInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutDailyLogInput | TaskCompletionUpsertWithWhereUniqueWithoutDailyLogInput[]
    createMany?: TaskCompletionCreateManyDailyLogInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutDailyLogInput | TaskCompletionUpdateWithWhereUniqueWithoutDailyLogInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutDailyLogInput | TaskCompletionUpdateManyWithWhereWithoutDailyLogInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type TaskCompletionUncheckedUpdateManyWithoutDailyLogNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutDailyLogInput, TaskCompletionUncheckedCreateWithoutDailyLogInput> | TaskCompletionCreateWithoutDailyLogInput[] | TaskCompletionUncheckedCreateWithoutDailyLogInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutDailyLogInput | TaskCompletionCreateOrConnectWithoutDailyLogInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutDailyLogInput | TaskCompletionUpsertWithWhereUniqueWithoutDailyLogInput[]
    createMany?: TaskCompletionCreateManyDailyLogInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutDailyLogInput | TaskCompletionUpdateWithWhereUniqueWithoutDailyLogInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutDailyLogInput | TaskCompletionUpdateManyWithWhereWithoutDailyLogInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type DailyLogCreateNestedOneWithoutTasksInput = {
    create?: XOR<DailyLogCreateWithoutTasksInput, DailyLogUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DailyLogCreateOrConnectWithoutTasksInput
    connect?: DailyLogWhereUniqueInput
  }

  export type EnumTaskTypeFieldUpdateOperationsInput = {
    set?: $Enums.TaskType
  }

  export type DailyLogUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<DailyLogCreateWithoutTasksInput, DailyLogUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DailyLogCreateOrConnectWithoutTasksInput
    upsert?: DailyLogUpsertWithoutTasksInput
    connect?: DailyLogWhereUniqueInput
    update?: XOR<XOR<DailyLogUpdateToOneWithWhereWithoutTasksInput, DailyLogUpdateWithoutTasksInput>, DailyLogUncheckedUpdateWithoutTasksInput>
  }

  export type UserTitleCreateNestedManyWithoutTitleInput = {
    create?: XOR<UserTitleCreateWithoutTitleInput, UserTitleUncheckedCreateWithoutTitleInput> | UserTitleCreateWithoutTitleInput[] | UserTitleUncheckedCreateWithoutTitleInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutTitleInput | UserTitleCreateOrConnectWithoutTitleInput[]
    createMany?: UserTitleCreateManyTitleInputEnvelope
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
  }

  export type UserTitleUncheckedCreateNestedManyWithoutTitleInput = {
    create?: XOR<UserTitleCreateWithoutTitleInput, UserTitleUncheckedCreateWithoutTitleInput> | UserTitleCreateWithoutTitleInput[] | UserTitleUncheckedCreateWithoutTitleInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutTitleInput | UserTitleCreateOrConnectWithoutTitleInput[]
    createMany?: UserTitleCreateManyTitleInputEnvelope
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
  }

  export type UserTitleUpdateManyWithoutTitleNestedInput = {
    create?: XOR<UserTitleCreateWithoutTitleInput, UserTitleUncheckedCreateWithoutTitleInput> | UserTitleCreateWithoutTitleInput[] | UserTitleUncheckedCreateWithoutTitleInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutTitleInput | UserTitleCreateOrConnectWithoutTitleInput[]
    upsert?: UserTitleUpsertWithWhereUniqueWithoutTitleInput | UserTitleUpsertWithWhereUniqueWithoutTitleInput[]
    createMany?: UserTitleCreateManyTitleInputEnvelope
    set?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    disconnect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    delete?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    update?: UserTitleUpdateWithWhereUniqueWithoutTitleInput | UserTitleUpdateWithWhereUniqueWithoutTitleInput[]
    updateMany?: UserTitleUpdateManyWithWhereWithoutTitleInput | UserTitleUpdateManyWithWhereWithoutTitleInput[]
    deleteMany?: UserTitleScalarWhereInput | UserTitleScalarWhereInput[]
  }

  export type UserTitleUncheckedUpdateManyWithoutTitleNestedInput = {
    create?: XOR<UserTitleCreateWithoutTitleInput, UserTitleUncheckedCreateWithoutTitleInput> | UserTitleCreateWithoutTitleInput[] | UserTitleUncheckedCreateWithoutTitleInput[]
    connectOrCreate?: UserTitleCreateOrConnectWithoutTitleInput | UserTitleCreateOrConnectWithoutTitleInput[]
    upsert?: UserTitleUpsertWithWhereUniqueWithoutTitleInput | UserTitleUpsertWithWhereUniqueWithoutTitleInput[]
    createMany?: UserTitleCreateManyTitleInputEnvelope
    set?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    disconnect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    delete?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    connect?: UserTitleWhereUniqueInput | UserTitleWhereUniqueInput[]
    update?: UserTitleUpdateWithWhereUniqueWithoutTitleInput | UserTitleUpdateWithWhereUniqueWithoutTitleInput[]
    updateMany?: UserTitleUpdateManyWithWhereWithoutTitleInput | UserTitleUpdateManyWithWhereWithoutTitleInput[]
    deleteMany?: UserTitleScalarWhereInput | UserTitleScalarWhereInput[]
  }

  export type TitleCreateNestedOneWithoutUsersInput = {
    create?: XOR<TitleCreateWithoutUsersInput, TitleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TitleCreateOrConnectWithoutUsersInput
    connect?: TitleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTitlesInput = {
    create?: XOR<UserCreateWithoutTitlesInput, UserUncheckedCreateWithoutTitlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTitlesInput
    connect?: UserWhereUniqueInput
  }

  export type TitleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<TitleCreateWithoutUsersInput, TitleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TitleCreateOrConnectWithoutUsersInput
    upsert?: TitleUpsertWithoutUsersInput
    connect?: TitleWhereUniqueInput
    update?: XOR<XOR<TitleUpdateToOneWithWhereWithoutUsersInput, TitleUpdateWithoutUsersInput>, TitleUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutTitlesNestedInput = {
    create?: XOR<UserCreateWithoutTitlesInput, UserUncheckedCreateWithoutTitlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTitlesInput
    upsert?: UserUpsertWithoutTitlesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTitlesInput, UserUpdateWithoutTitlesInput>, UserUncheckedUpdateWithoutTitlesInput>
  }

  export type ArticleCreatetagsInput = {
    set: string[]
  }

  export type ArticleReadCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleReadCreateWithoutArticleInput, ArticleReadUncheckedCreateWithoutArticleInput> | ArticleReadCreateWithoutArticleInput[] | ArticleReadUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleReadCreateOrConnectWithoutArticleInput | ArticleReadCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleReadCreateManyArticleInputEnvelope
    connect?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
  }

  export type ArticleReadUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleReadCreateWithoutArticleInput, ArticleReadUncheckedCreateWithoutArticleInput> | ArticleReadCreateWithoutArticleInput[] | ArticleReadUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleReadCreateOrConnectWithoutArticleInput | ArticleReadCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleReadCreateManyArticleInputEnvelope
    connect?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
  }

  export type ArticleUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ArticleReadUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleReadCreateWithoutArticleInput, ArticleReadUncheckedCreateWithoutArticleInput> | ArticleReadCreateWithoutArticleInput[] | ArticleReadUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleReadCreateOrConnectWithoutArticleInput | ArticleReadCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleReadUpsertWithWhereUniqueWithoutArticleInput | ArticleReadUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleReadCreateManyArticleInputEnvelope
    set?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    disconnect?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    delete?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    connect?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    update?: ArticleReadUpdateWithWhereUniqueWithoutArticleInput | ArticleReadUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleReadUpdateManyWithWhereWithoutArticleInput | ArticleReadUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleReadScalarWhereInput | ArticleReadScalarWhereInput[]
  }

  export type ArticleReadUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleReadCreateWithoutArticleInput, ArticleReadUncheckedCreateWithoutArticleInput> | ArticleReadCreateWithoutArticleInput[] | ArticleReadUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleReadCreateOrConnectWithoutArticleInput | ArticleReadCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleReadUpsertWithWhereUniqueWithoutArticleInput | ArticleReadUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleReadCreateManyArticleInputEnvelope
    set?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    disconnect?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    delete?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    connect?: ArticleReadWhereUniqueInput | ArticleReadWhereUniqueInput[]
    update?: ArticleReadUpdateWithWhereUniqueWithoutArticleInput | ArticleReadUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleReadUpdateManyWithWhereWithoutArticleInput | ArticleReadUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleReadScalarWhereInput | ArticleReadScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutReadsInput = {
    create?: XOR<ArticleCreateWithoutReadsInput, ArticleUncheckedCreateWithoutReadsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutReadsInput
    connect?: ArticleWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutReadsNestedInput = {
    create?: XOR<ArticleCreateWithoutReadsInput, ArticleUncheckedCreateWithoutReadsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutReadsInput
    upsert?: ArticleUpsertWithoutReadsInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutReadsInput, ArticleUpdateWithoutReadsInput>, ArticleUncheckedUpdateWithoutReadsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Level | EnumLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLevelNullableFilter<$PrismaModel> | $Enums.Level | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Level | EnumLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Level[] | ListEnumLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.Level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeFilter<$PrismaModel> | $Enums.TaskType
  }

  export type NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DailyLogCreateWithoutUserInput = {
    id?: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCompletionCreateNestedManyWithoutDailyLogInput
  }

  export type DailyLogUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCompletionUncheckedCreateNestedManyWithoutDailyLogInput
  }

  export type DailyLogCreateOrConnectWithoutUserInput = {
    where: DailyLogWhereUniqueInput
    create: XOR<DailyLogCreateWithoutUserInput, DailyLogUncheckedCreateWithoutUserInput>
  }

  export type DailyLogCreateManyUserInputEnvelope = {
    data: DailyLogCreateManyUserInput | DailyLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserTitleCreateWithoutUserInput = {
    id?: string
    earnedAt?: Date | string
    title: TitleCreateNestedOneWithoutUsersInput
  }

  export type UserTitleUncheckedCreateWithoutUserInput = {
    id?: string
    titleId: string
    earnedAt?: Date | string
  }

  export type UserTitleCreateOrConnectWithoutUserInput = {
    where: UserTitleWhereUniqueInput
    create: XOR<UserTitleCreateWithoutUserInput, UserTitleUncheckedCreateWithoutUserInput>
  }

  export type UserTitleCreateManyUserInputEnvelope = {
    data: UserTitleCreateManyUserInput | UserTitleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DailyLogUpsertWithWhereUniqueWithoutUserInput = {
    where: DailyLogWhereUniqueInput
    update: XOR<DailyLogUpdateWithoutUserInput, DailyLogUncheckedUpdateWithoutUserInput>
    create: XOR<DailyLogCreateWithoutUserInput, DailyLogUncheckedCreateWithoutUserInput>
  }

  export type DailyLogUpdateWithWhereUniqueWithoutUserInput = {
    where: DailyLogWhereUniqueInput
    data: XOR<DailyLogUpdateWithoutUserInput, DailyLogUncheckedUpdateWithoutUserInput>
  }

  export type DailyLogUpdateManyWithWhereWithoutUserInput = {
    where: DailyLogScalarWhereInput
    data: XOR<DailyLogUpdateManyMutationInput, DailyLogUncheckedUpdateManyWithoutUserInput>
  }

  export type DailyLogScalarWhereInput = {
    AND?: DailyLogScalarWhereInput | DailyLogScalarWhereInput[]
    OR?: DailyLogScalarWhereInput[]
    NOT?: DailyLogScalarWhereInput | DailyLogScalarWhereInput[]
    id?: StringFilter<"DailyLog"> | string
    userId?: StringFilter<"DailyLog"> | string
    date?: DateTimeFilter<"DailyLog"> | Date | string
    dayRecap?: StringNullableFilter<"DailyLog"> | string | null
    aiReview?: StringNullableFilter<"DailyLog"> | string | null
    totalXp?: IntFilter<"DailyLog"> | number
    createdAt?: DateTimeFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeFilter<"DailyLog"> | Date | string
  }

  export type UserTitleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserTitleWhereUniqueInput
    update: XOR<UserTitleUpdateWithoutUserInput, UserTitleUncheckedUpdateWithoutUserInput>
    create: XOR<UserTitleCreateWithoutUserInput, UserTitleUncheckedCreateWithoutUserInput>
  }

  export type UserTitleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserTitleWhereUniqueInput
    data: XOR<UserTitleUpdateWithoutUserInput, UserTitleUncheckedUpdateWithoutUserInput>
  }

  export type UserTitleUpdateManyWithWhereWithoutUserInput = {
    where: UserTitleScalarWhereInput
    data: XOR<UserTitleUpdateManyMutationInput, UserTitleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserTitleScalarWhereInput = {
    AND?: UserTitleScalarWhereInput | UserTitleScalarWhereInput[]
    OR?: UserTitleScalarWhereInput[]
    NOT?: UserTitleScalarWhereInput | UserTitleScalarWhereInput[]
    id?: StringFilter<"UserTitle"> | string
    userId?: StringFilter<"UserTitle"> | string
    titleId?: StringFilter<"UserTitle"> | string
    earnedAt?: DateTimeFilter<"UserTitle"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogCreateNestedManyWithoutUserInput
    titles?: UserTitleCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogUncheckedCreateNestedManyWithoutUserInput
    titles?: UserTitleUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUpdateManyWithoutUserNestedInput
    titles?: UserTitleUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUncheckedUpdateManyWithoutUserNestedInput
    titles?: UserTitleUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogCreateNestedManyWithoutUserInput
    titles?: UserTitleCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogUncheckedCreateNestedManyWithoutUserInput
    titles?: UserTitleUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUpdateManyWithoutUserNestedInput
    titles?: UserTitleUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUncheckedUpdateManyWithoutUserNestedInput
    titles?: UserTitleUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDailyLogsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    titles?: UserTitleCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDailyLogsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    titles?: UserTitleUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDailyLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDailyLogsInput, UserUncheckedCreateWithoutDailyLogsInput>
  }

  export type TaskCompletionCreateWithoutDailyLogInput = {
    id?: string
    taskType: $Enums.TaskType
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUncheckedCreateWithoutDailyLogInput = {
    id?: string
    taskType: $Enums.TaskType
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionCreateOrConnectWithoutDailyLogInput = {
    where: TaskCompletionWhereUniqueInput
    create: XOR<TaskCompletionCreateWithoutDailyLogInput, TaskCompletionUncheckedCreateWithoutDailyLogInput>
  }

  export type TaskCompletionCreateManyDailyLogInputEnvelope = {
    data: TaskCompletionCreateManyDailyLogInput | TaskCompletionCreateManyDailyLogInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDailyLogsInput = {
    update: XOR<UserUpdateWithoutDailyLogsInput, UserUncheckedUpdateWithoutDailyLogsInput>
    create: XOR<UserCreateWithoutDailyLogsInput, UserUncheckedCreateWithoutDailyLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDailyLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDailyLogsInput, UserUncheckedUpdateWithoutDailyLogsInput>
  }

  export type UserUpdateWithoutDailyLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    titles?: UserTitleUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDailyLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    titles?: UserTitleUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCompletionUpsertWithWhereUniqueWithoutDailyLogInput = {
    where: TaskCompletionWhereUniqueInput
    update: XOR<TaskCompletionUpdateWithoutDailyLogInput, TaskCompletionUncheckedUpdateWithoutDailyLogInput>
    create: XOR<TaskCompletionCreateWithoutDailyLogInput, TaskCompletionUncheckedCreateWithoutDailyLogInput>
  }

  export type TaskCompletionUpdateWithWhereUniqueWithoutDailyLogInput = {
    where: TaskCompletionWhereUniqueInput
    data: XOR<TaskCompletionUpdateWithoutDailyLogInput, TaskCompletionUncheckedUpdateWithoutDailyLogInput>
  }

  export type TaskCompletionUpdateManyWithWhereWithoutDailyLogInput = {
    where: TaskCompletionScalarWhereInput
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyWithoutDailyLogInput>
  }

  export type TaskCompletionScalarWhereInput = {
    AND?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
    OR?: TaskCompletionScalarWhereInput[]
    NOT?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
    id?: StringFilter<"TaskCompletion"> | string
    dailyLogId?: StringFilter<"TaskCompletion"> | string
    taskType?: EnumTaskTypeFilter<"TaskCompletion"> | $Enums.TaskType
    completed?: BoolFilter<"TaskCompletion"> | boolean
    completedAt?: DateTimeNullableFilter<"TaskCompletion"> | Date | string | null
    xpEarned?: IntFilter<"TaskCompletion"> | number
    metadata?: JsonNullableFilter<"TaskCompletion">
  }

  export type DailyLogCreateWithoutTasksInput = {
    id?: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDailyLogsInput
  }

  export type DailyLogUncheckedCreateWithoutTasksInput = {
    id?: string
    userId: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyLogCreateOrConnectWithoutTasksInput = {
    where: DailyLogWhereUniqueInput
    create: XOR<DailyLogCreateWithoutTasksInput, DailyLogUncheckedCreateWithoutTasksInput>
  }

  export type DailyLogUpsertWithoutTasksInput = {
    update: XOR<DailyLogUpdateWithoutTasksInput, DailyLogUncheckedUpdateWithoutTasksInput>
    create: XOR<DailyLogCreateWithoutTasksInput, DailyLogUncheckedCreateWithoutTasksInput>
    where?: DailyLogWhereInput
  }

  export type DailyLogUpdateToOneWithWhereWithoutTasksInput = {
    where?: DailyLogWhereInput
    data: XOR<DailyLogUpdateWithoutTasksInput, DailyLogUncheckedUpdateWithoutTasksInput>
  }

  export type DailyLogUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDailyLogsNestedInput
  }

  export type DailyLogUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTitleCreateWithoutTitleInput = {
    id?: string
    earnedAt?: Date | string
    user: UserCreateNestedOneWithoutTitlesInput
  }

  export type UserTitleUncheckedCreateWithoutTitleInput = {
    id?: string
    userId: string
    earnedAt?: Date | string
  }

  export type UserTitleCreateOrConnectWithoutTitleInput = {
    where: UserTitleWhereUniqueInput
    create: XOR<UserTitleCreateWithoutTitleInput, UserTitleUncheckedCreateWithoutTitleInput>
  }

  export type UserTitleCreateManyTitleInputEnvelope = {
    data: UserTitleCreateManyTitleInput | UserTitleCreateManyTitleInput[]
    skipDuplicates?: boolean
  }

  export type UserTitleUpsertWithWhereUniqueWithoutTitleInput = {
    where: UserTitleWhereUniqueInput
    update: XOR<UserTitleUpdateWithoutTitleInput, UserTitleUncheckedUpdateWithoutTitleInput>
    create: XOR<UserTitleCreateWithoutTitleInput, UserTitleUncheckedCreateWithoutTitleInput>
  }

  export type UserTitleUpdateWithWhereUniqueWithoutTitleInput = {
    where: UserTitleWhereUniqueInput
    data: XOR<UserTitleUpdateWithoutTitleInput, UserTitleUncheckedUpdateWithoutTitleInput>
  }

  export type UserTitleUpdateManyWithWhereWithoutTitleInput = {
    where: UserTitleScalarWhereInput
    data: XOR<UserTitleUpdateManyMutationInput, UserTitleUncheckedUpdateManyWithoutTitleInput>
  }

  export type TitleCreateWithoutUsersInput = {
    id?: string
    name: string
    description: string
    icon: string
    requirement: string
  }

  export type TitleUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description: string
    icon: string
    requirement: string
  }

  export type TitleCreateOrConnectWithoutUsersInput = {
    where: TitleWhereUniqueInput
    create: XOR<TitleCreateWithoutUsersInput, TitleUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutTitlesInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTitlesInput = {
    id?: string
    email: string
    passwordHash?: string | null
    displayName: string
    avatarUrl?: string | null
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    nativeLanguage?: string
    targetLanguage?: string
    country?: string | null
    level?: $Enums.Level | null
    role?: $Enums.UserRole
    totalXp?: number
    currentStreak?: number
    longestStreak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyLogs?: DailyLogUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTitlesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTitlesInput, UserUncheckedCreateWithoutTitlesInput>
  }

  export type TitleUpsertWithoutUsersInput = {
    update: XOR<TitleUpdateWithoutUsersInput, TitleUncheckedUpdateWithoutUsersInput>
    create: XOR<TitleCreateWithoutUsersInput, TitleUncheckedCreateWithoutUsersInput>
    where?: TitleWhereInput
  }

  export type TitleUpdateToOneWithWhereWithoutUsersInput = {
    where?: TitleWhereInput
    data: XOR<TitleUpdateWithoutUsersInput, TitleUncheckedUpdateWithoutUsersInput>
  }

  export type TitleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
  }

  export type TitleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    requirement?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutTitlesInput = {
    update: XOR<UserUpdateWithoutTitlesInput, UserUncheckedUpdateWithoutTitlesInput>
    create: XOR<UserCreateWithoutTitlesInput, UserUncheckedCreateWithoutTitlesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTitlesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTitlesInput, UserUncheckedUpdateWithoutTitlesInput>
  }

  export type UserUpdateWithoutTitlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTitlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    nativeLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableEnumLevelFieldUpdateOperationsInput | $Enums.Level | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    totalXp?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyLogs?: DailyLogUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleReadCreateWithoutArticleInput = {
    id?: string
    userId: string
    date: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    createdAt?: Date | string
  }

  export type ArticleReadUncheckedCreateWithoutArticleInput = {
    id?: string
    userId: string
    date: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    createdAt?: Date | string
  }

  export type ArticleReadCreateOrConnectWithoutArticleInput = {
    where: ArticleReadWhereUniqueInput
    create: XOR<ArticleReadCreateWithoutArticleInput, ArticleReadUncheckedCreateWithoutArticleInput>
  }

  export type ArticleReadCreateManyArticleInputEnvelope = {
    data: ArticleReadCreateManyArticleInput | ArticleReadCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type ArticleReadUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleReadWhereUniqueInput
    update: XOR<ArticleReadUpdateWithoutArticleInput, ArticleReadUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleReadCreateWithoutArticleInput, ArticleReadUncheckedCreateWithoutArticleInput>
  }

  export type ArticleReadUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleReadWhereUniqueInput
    data: XOR<ArticleReadUpdateWithoutArticleInput, ArticleReadUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleReadUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleReadScalarWhereInput
    data: XOR<ArticleReadUpdateManyMutationInput, ArticleReadUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleReadScalarWhereInput = {
    AND?: ArticleReadScalarWhereInput | ArticleReadScalarWhereInput[]
    OR?: ArticleReadScalarWhereInput[]
    NOT?: ArticleReadScalarWhereInput | ArticleReadScalarWhereInput[]
    id?: StringFilter<"ArticleRead"> | string
    userId?: StringFilter<"ArticleRead"> | string
    articleId?: StringFilter<"ArticleRead"> | string
    date?: DateTimeFilter<"ArticleRead"> | Date | string
    completed?: BoolFilter<"ArticleRead"> | boolean
    completedAt?: DateTimeNullableFilter<"ArticleRead"> | Date | string | null
    xpEarned?: IntFilter<"ArticleRead"> | number
    createdAt?: DateTimeFilter<"ArticleRead"> | Date | string
  }

  export type ArticleCreateWithoutReadsInput = {
    id?: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage?: string | null
    readTime?: number
    category?: string
    tags?: ArticleCreatetagsInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUncheckedCreateWithoutReadsInput = {
    id?: string
    title: string
    slug: string
    summary: string
    content: string
    coverImage?: string | null
    readTime?: number
    category?: string
    tags?: ArticleCreatetagsInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCreateOrConnectWithoutReadsInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutReadsInput, ArticleUncheckedCreateWithoutReadsInput>
  }

  export type ArticleUpsertWithoutReadsInput = {
    update: XOR<ArticleUpdateWithoutReadsInput, ArticleUncheckedUpdateWithoutReadsInput>
    create: XOR<ArticleCreateWithoutReadsInput, ArticleUncheckedCreateWithoutReadsInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutReadsInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutReadsInput, ArticleUncheckedUpdateWithoutReadsInput>
  }

  export type ArticleUpdateWithoutReadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateWithoutReadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    readTime?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyLogCreateManyUserInput = {
    id?: string
    date: Date | string
    dayRecap?: string | null
    aiReview?: string | null
    totalXp?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserTitleCreateManyUserInput = {
    id?: string
    titleId: string
    earnedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type DailyLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskCompletionUpdateManyWithoutDailyLogNestedInput
  }

  export type DailyLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskCompletionUncheckedUpdateManyWithoutDailyLogNestedInput
  }

  export type DailyLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dayRecap?: NullableStringFieldUpdateOperationsInput | string | null
    aiReview?: NullableStringFieldUpdateOperationsInput | string | null
    totalXp?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTitleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: TitleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserTitleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    titleId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTitleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    titleId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionCreateManyDailyLogInput = {
    id?: string
    taskType: $Enums.TaskType
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUpdateWithoutDailyLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUncheckedUpdateWithoutDailyLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TaskCompletionUncheckedUpdateManyWithoutDailyLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserTitleCreateManyTitleInput = {
    id?: string
    userId: string
    earnedAt?: Date | string
  }

  export type UserTitleUpdateWithoutTitleInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTitlesNestedInput
  }

  export type UserTitleUncheckedUpdateWithoutTitleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserTitleUncheckedUpdateManyWithoutTitleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleReadCreateManyArticleInput = {
    id?: string
    userId: string
    date: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    xpEarned?: number
    createdAt?: Date | string
  }

  export type ArticleReadUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleReadUncheckedUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleReadUncheckedUpdateManyWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    xpEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyLogCountOutputTypeDefaultArgs instead
     */
    export type DailyLogCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyLogCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TitleCountOutputTypeDefaultArgs instead
     */
    export type TitleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TitleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleCountOutputTypeDefaultArgs instead
     */
    export type ArticleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountDefaultArgs instead
     */
    export type AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationDefaultArgs instead
     */
    export type VerificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyLogDefaultArgs instead
     */
    export type DailyLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCompletionDefaultArgs instead
     */
    export type TaskCompletionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCompletionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TitleDefaultArgs instead
     */
    export type TitleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TitleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserTitleDefaultArgs instead
     */
    export type UserTitleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserTitleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleDefaultArgs instead
     */
    export type ArticleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleReadDefaultArgs instead
     */
    export type ArticleReadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleReadDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}