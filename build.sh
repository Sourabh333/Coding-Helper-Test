cd frontend
npm ci && npm run build

cd ..
rm -r backend/src/main/resources/static
cp -r frontend/build backend/src/main/resources/static
cd backend
./mvnw clean install package
