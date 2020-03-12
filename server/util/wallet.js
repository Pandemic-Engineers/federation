const EC = require('elliptic').ec
const crypto = require('crypto')
const NodeRSA = require('node-rsa')
const config = require('../../config/config')

function encryptKeyWithRSA(key) {
    let rsa = new NodeRSA();
    rsa.importKey(config.rsa_public_key, 'pkcs8-public');
    return rsa.encrypt(key, 'base64');
}

function encryptKeyWithSalt(key, salt) {
    let hash = crypto.createHmac('sha256', config.system_secret); /** Hashing algorithm sha256 */
    hash.update(salt);
    let saltHash = hash.digest('hex').substring(0, 32); // Must be 256 bytes (32 characters)

    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(saltHash), iv);
    let encrypted = cipher.update(key);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

module.exports = {
  getAccount(wallet) {
      const salt = crypto.randomBytes(16).toString('hex');
      const encryptedKey = encryptKeyWithSalt(wallet.privatekey, salt);
      const keySys = encryptKeyWithRSA(wallet.privatekey);
      return {
          external: wallet.publickey,
          external_address: wallet.key,
          salt: salt,
          encrypted_key: encryptedKey,
          key_sys: keySys,
      }
  },

  signMessage(privateKey, message) {
    const messageHash = crypto.createHash('sha256').update(message).digest('hex')
    const ec = new EC('p256')
    const key = ec.keyFromPrivate(privateKey, 'hex')
    const signature = key.sign(messageHash)
    return signature.toDER('hex')
  },

  decryptKeyWithSalt(cryptedKey, salt) {
      const hash = crypto.createHmac('sha256', config.system_secret); /** Hashing algorithm sha256 */
      hash.update(salt);
      const saltHash = hash.digest('hex').substring(0, 32);;

      let textParts = cryptedKey.split(':');
      let iv = new Buffer(textParts.shift(), 'hex');
      let encryptedText = new Buffer(textParts.join(':'), 'hex');
      let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(saltHash), iv);
      let decrypted = decipher.update(encryptedText);

      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString();
  }

}
