import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', (): void => {
  beforeAll(() => 
    jest.useFakeTimers()
  );
  
  beforeEach(() => 
    jest.runOnlyPendingTimers()
  );
  
  afterEach(() => 
    jest.clearAllMocks()
  );
  
  afterAll(() => 
    jest.useRealTimers()
  );

  const baseURL = 'https://jsonplaceholder.typicode.com';

  const endPoint = '/posts/1';

  test('should create instance with provided base url', async (): Promise<void> => {
    const spyOnCreateInstance: jest.SpyInstance<AxiosInstance> = jest.spyOn(
      axios,
      'create',
    );

    await throttledGetDataFromApi(endPoint);

    expect(spyOnCreateInstance).lastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async (): Promise<void> => {
    const spyGet: jest.SpyInstance = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(endPoint);

    expect(spyGet).lastCalledWith(endPoint);
  });

  test('should return response data', async (): Promise<void> => {
    type Post = {
      userId: number;
      id: number;
      title: string;
      body: string;
    };

    const responseData: Post = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };

    const data = await throttledGetDataFromApi(endPoint);

    expect(responseData).toEqual(expect.objectContaining(data));
  });
});