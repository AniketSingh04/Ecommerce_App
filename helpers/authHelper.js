import bcrypt, { compare } from "bcrypt";

// Function to hash a password
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds to use for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password with the specified number of salt rounds
        return hashedPassword; // Return the hashed password
    } catch (error) {
        console.log(error); // Log any errors that occur during hashing
    }
};

// Function to compare a plain password with a hashed password
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); // Compare the plain password with the hashed password and return the result (true or false)
};
