import jsonServerProvider from 'ra-data-json-server';
const servicesHost = 'http://192.168.0.165:3500/admin';

const dataProvider = jsonServerProvider(servicesHost);

const myDataProvider = {
    ...dataProvider,
    create: (resource, params) => { 
        
        console.log(params.data)

        if (resource !== 'books' || !params.data.illustration_cover) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }            
       
        const myFile = params.data.illustration_cover;
          if ( !myFile.rawFile instanceof File ){
              return Promise.reject('Error: Not a file...'); // Didn't test this...
          }

          return Promise.resolve(convertFileToBase64(myFile))
              .then( (picture64) => ({
                  src: picture64,
                  title: `${myFile.title}`
              }))
              .then( transformedMyFile => dataProvider.create(resource, {
                  ...params,
                  data: {
                      ...params.data,
                      myFile: transformedMyFile
                  }
              }));
    }
};
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
  
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default myDataProvider;