process.env.TZ = 'UTC';
const PORT = process.env.PORT || 3001;

const start = (): void => {
    console.log(`express server running at http://localhost:${PORT}`);
};

start();
