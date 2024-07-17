export async function hashPassword(password: string): Promise<Uint8Array> {
  const myText = new TextEncoder().encode(password);

  const myDigest = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    myText // The data you want to hash as an ArrayBuffer
  );

  const hashedPassword = new Uint8Array(myDigest);
  // console.log(hashedPassword);
  return hashedPassword;
}

export async function verifyPassword(
  storedHash: Uint8Array,
  inputPassword: string
): Promise<boolean> {
  const inputHash = await hashPassword(inputPassword);
  return storedHash.every((byte, index) => byte === inputHash[index]);
}

// (async ()=>{
// const password = 'kshuith'
//     const hash1 = await hashPassword(password);
//     const hash1 = await hashPassword(password);

//    const isValid = await verifyPassword(hash1,'kshuith');
//     console.log(isValid);
// })();
