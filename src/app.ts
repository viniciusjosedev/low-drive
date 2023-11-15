import express from 'express';

class Main {
  public static server (port: string | number = 3000, callback: () => void): void {
    const app = express();
    app.use(express.json());
    app.get('/', (_req, res) => {
      res.send('Hello World!');
    });
    app.listen(port, callback);
  }
}

export const { server } = Main;

export default Main;
