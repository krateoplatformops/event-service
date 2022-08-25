const express = require('express')
const router = express.Router()

const k8sHelpers = require('../service-library/helpers/k8s.helpers')
const { k8sConstants } = require('../service-library/constants')
const logger = require('../service-library/helpers/logger.helpers')
const timeHelpers = require('../service-library/helpers/time.helpers')

router.get('/:deploymentId', async (req, res, next) => {
  try {
    logger.debug(k8sConstants.eventApi)

    const list = await k8sHelpers.getList(
      k8sConstants.eventApi,
      `deploymentId=${req.params.deploymentId}`
    )

    res.status(200).json({
      list: list.map((x) => {
        return {
          message: x.message,
          time: timeHelpers.fromDateToEpoch(x.firstTimestamp),
          level: x.type.toLowerCase(),
          reason: x.reason,
          source: x.involvedObject.name,
          deploymentId: x.metadata.labels.deploymentId
        }
      })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
