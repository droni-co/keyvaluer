const keyvault = document.getElementById('keyvault') as HTMLInputElement;
const btnKeyvault = document.getElementById('btn-keyvault') as HTMLButtonElement;
const secretList = document.getElementById('secret-list') as HTMLUListElement;
const loading = document.getElementById('loading') as HTMLDivElement;

// tootle loading
const toggleLoading = (active:boolean) => {
  active ? loading.classList.remove('d-none') : loading.classList.add('d-none');
}
// fetch data from /kv/:keyvault
const getSecrets = async (kvName:string) => {
  return (await fetch(`/kv/${kvName}`)).json();
}

// fetch data from /kv/:keyvault/secret/:secret
const getSecret = async (kvName:string, secretName:string) => {
  return (await fetch(`/kv/${kvName}/secret/${secretName}`)).json();
}

//select secret 
const selectSecret = (sButton:HTMLButtonElement, secret:string) => {
  toggleLoading(true);
  const newElement = document.createElement('code');
  newElement.classList.add('alert', 'alert-info');
  // fetch secret
  getSecret(keyvault.value, secret).then((res) => {
    newElement.innerText = JSON.stringify(res);
  }).finally(() => {
    toggleLoading(false);
  });
  sButton.parentNode?.insertBefore(newElement, sButton.nextSibling)
  console.log(secret);
}

// insert element in secret list
const insertSecret = (secret:string) => {
  const sButton = document.createElement('button');
  sButton.classList.add('list-group-item', 'btn', 'btn-outline-info');
  sButton.innerText = secret;
  secretList.appendChild(sButton);
  console.log('hola')
  sButton.addEventListener('click', () => {
    selectSecret(sButton, secret)
  });
}

btnKeyvault.addEventListener('click', () => {
  toggleLoading(true);
  secretList.innerHTML = '';
  getSecrets(keyvault.value).then((res) => {
    res.forEach((secret:any) => {
      insertSecret(secret.name);
    });
  }).finally(() => {
    toggleLoading(false);
  });
});

toggleLoading(false);