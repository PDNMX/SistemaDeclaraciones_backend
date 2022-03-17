import {
  Pagination,
  PaginationInputOptions,
  UserDocument,
  UserES,
} from '../types';
import { Client } from '@elastic/elasticsearch';


class ElasticSearchAPI {
  private elasticClient: Client;

  public constructor(elasticClient: Client) {
    this.elasticClient = elasticClient;
  }

  public async add(user: UserDocument): Promise<void> {
    await this.elasticClient.index({
      index: 'users',
      id: `${user._id}`,
      body: {
        username: user.username,
        nombre: user.nombre,
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido,
        institucion: user.institucion,
        curp: user.curp,
        rfc: user.rfc,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.elasticClient.delete({
      index: 'users',
      id: id,
    });
  }

  public async update(user: UserDocument): Promise<void> {
    await this.elasticClient.update({
      index: 'users',
      id: `${user._id}`,
      body: {
        doc: {
          username: user.username,
          nombre: user.nombre,
          primerApellido: user.primerApellido,
          segundoApellido: user.segundoApellido,
          institucion: user.institucion,
          curp: user.curp,
          rfc: user.rfc,
          roles: user.roles,
          updatedAt: user.updatedAt,
        }
      },
    });
  }

  public async search(keyword: string, pagination: PaginationInputOptions = {}): Promise<Pagination<UserES>> {
    const page: number = pagination.page || 0;
    const size: number = pagination.size || 20;
    const result = await this.elasticClient.search({
      index: 'users',
      q: `*${keyword}*`,
      from: page * size,
      size: Math.min(size, 100),
      sort: 'createdAt:desc',
    });

    const users: UserES[] = [];
    result.body.hits.hits.forEach((item: unknown) => {
      const document = item as { _id: string, _source: UserES };
      const user = document._source;
      user._id = document._id;

      users.push(user);
    });

    return {
      totalDocs: users.length,
      docs: users,
      page: page,
      limit: size,
    };
  }
}

const elasticClient: ElasticSearchAPI = new ElasticSearchAPI(
  new Client({
    node: `${process.env.ELASTIC_SEARCH_URL}`,
    auth: {
      username: 'elastic',
      password: `${process.env.ELASTIC_SEARCH_PASSWORD}`
    }
  })
);

export default elasticClient;
