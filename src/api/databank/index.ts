import env from '../../common/enviroments'

const mainUrl = env.DATABANK;

export const getCharacterByName = async (name: string) => {
    const url = `${mainUrl}/name/${name}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error searching for characters information: ${response.statusText}`);
        }
        
        const data = await response.json();
        const hasData = await data?.length > 0;

        if (!hasData) {
            throw new Error(`No character available`);
        }

        return data[0];
    } catch (error) {
        console.error("Error searching for characters information", error);
        throw error;
    }
};
