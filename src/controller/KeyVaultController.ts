import { Request, Response } from 'express';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
import dotenv from 'dotenv';
dotenv.config();

const credential = new DefaultAzureCredential();

const KeyVaultController = {
  async index(req: Request, res: Response) {
    // /kv/KVLTDSLAB002
    const { keyvault } = req.params;
    try {
      const url = `https://${String(keyvault)}.vault.azure.net`;
      const client = new SecretClient(url, credential);

      const secrets = [];
      for await (let secretProperties of client.listPropertiesOfSecrets()) {
        secrets.push(secretProperties);
      }

      return res.json(secrets);
    } catch (error) {
      return res.json(error);
    }
  },
  async show(req: Request, res: Response) {
    // /kv/KVLTDSLAB002/secret/SERVERSEC
    const { keyvault, secret } = req.params;
    try {
      if(!keyvault) throw new Error("KEY_VAULT_NAME is empty");
      const url = `https://${String(keyvault)}.vault.azure.net`;
      const client = new SecretClient(url, credential);
    
      // Read the secret we created
      const secretInfo = await client.getSecret(String(secret));
      return res.json(secretInfo);
    } catch (error) {
      return res.json(error);
    }
  }
}

export default KeyVaultController;