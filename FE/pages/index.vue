<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <img src="../assets/flameOn.svg" alt="" class="img-size">
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Burn Pit
        </v-card-title>
        <v-card-text>
          <p>Here we monitor and track burn and hazards material incidents in the US Military</p>
          <v-card-title >Sources</v-card-title>
          <p>
            Militart Times article on burn pit exposure <a
              href="https://www.militarytimes.com/news/your-military/2019/12/04/these-maps-can-help-you-figure-out-your-burn-pit-exposure-risk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Militart Times
            </a>.
          </p>
          <p>
            Army Public Health Center- Periodic Occupational and Environmental Monitoring Summary (POEMS) <a
              href="https://phc.amedd.army.mil/topics/envirohealth/hrasm/Pages/POEMS.aspx"
              target="_blank"
              rel="noopener noreferrer"
              title="APHC"
            >
              Army Public Health Center
            </a>.
          </p>
          <!-- <v-row>
            <v-btn to="/incident">Incident Report</v-btn> <v-spacer /> <v-btn to="/map">Map of Incidents</v-btn>
          </v-row> -->
        </v-card-text>
        <v-card-actions>
          <v-btn to="/incident">
            Incident Report
          </v-btn> <v-spacer /> <v-btn to="/map">
            Map of Incidents
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default { 
}
</script>
<style >
.img-size {
  height: 200px;
}
</style>
