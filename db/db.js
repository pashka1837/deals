const db = {};

async function saveInstallation(userId, companyId, tokens) {
  db[`${userId}_${companyId}`] = {
    ...tokens,
    userId,
    companyId,
  };
}

async function getClientInstallation(userId, companyId) {
  return db[`${userId}_${companyId}`];
}

export { saveInstallation, getClientInstallation };
