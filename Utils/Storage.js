import * as SecureStore from 'expo-secure-store';

// This class is a wrapper around the SecureStore API
// It provides a simple interface to set, get and remove values from the storage
// The storage is encrypted and persisted between app launches
export class Storage {
	// Set a value in the storage
	static async set(key, value) {
		await SecureStore.setItemAsync(key, value);
	};

	 // Get a value from the storage
 	static async get(key) {
		return await SecureStore.getItemAsync(key);
	};

	//  Remove a value from the storage
	static async remove(key) {
		return await SecureStore.deleteItemAsync(key);
	};
}
