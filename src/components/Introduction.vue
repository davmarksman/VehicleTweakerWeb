<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import IconFile from './icons/IconFile.vue'
import IconClipboard from './icons/IconClipboard.vue'
</script>

<template>
  <h1 class="h2">Editor for Transport Fever 2 Vehicle Tweaker Mod by WernerK</h1>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>1. Install Mod</template>
    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2668633703">Vehicle Tweaker Mod on steam</a>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconFile />
    </template>
    <template #heading>2. Find the <i>wkvt_settings.lua</i> file in the mods folder</template>

    Check here to find the mod directory: <a href="https://www.transportfever2.com/wiki/doku.php?id=gamemanual:gamefilelocations#overview">https://www.transportfever2.com/wiki/doku.php?id=gamemanual:gamefilelocations#overview</a>
    <br />
    Then its:
    <ul>
      <li>Steam:   /2668633703/res/scripts/wkvt_settings.lua</li>
      <li>Downloaded: /wk_vehicle_tweaker_1/res/scripts/wkvt_settings.lua</li>
    </ul>
    <div class="alert alert-primary" role="alert">
      <small>C:\Program Files (x86)\Steam\steamapps\workshop\content\1066780\2668633703\res\scripts</small>
    </div>
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconClipboard />
    </template>
    <template #heading>3. Copy the contents of the file into this tool</template>

    Open the file in a text editor and then copy the contents of the file.
    <br/>
    Click on the "Paste File" button below and paste the contents into the text box in that window. Click "Upload" when done.
    <br/>
    You can also start from scratch by clicking the create new button.
  </WelcomeItem>

<WelcomeItem>
  <template #icon>
    <EcosystemIcon />
  </template>
  <template #heading>4. Edit the file in this tool</template>

  Then export the results when you are done
</WelcomeItem>

<WelcomeItem>
  <template #icon>
    <DocumentationIcon />
  </template>
  <template #heading>5. Replace the contents of your <i>wkvt_settings.lua</i></template>

  Copy the text from the tool and replace the contents of your wkvt_settings.lua file with it
  <br/>
  You then need to reload your save game for changes to take place  
</WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>That's All</template>
    Enjoy! All credit to WernerK for creating an incredible mod
    <br/>
    Got stuck? Ask your question on 
    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2668633703" target="_blank" rel="noopener">Steam</a>
    <br/>
    GitHub Repo: <a href="https://github.com/davmarksman/VehicleTweakerWeb">Github</a>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Privacy</template>
    
    This website does not use any cookies or analytics. We do not store any user data and we do not track you
  </WelcomeItem>
</template>
