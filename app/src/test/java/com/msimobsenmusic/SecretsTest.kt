package com.msimobsenmusic

import java.util.Properties
import java.io.File
import org.junit.Test
import org.junit.Assert.*

class SecretsTest {

    @Test
    fun testSecrets() {
        val properties = Properties()
        val file = File("../secrets.properties")
        if (file.exists()) {
            properties.load(file.inputStream())
        }
        val apiKey = properties.getProperty("MAPS_API_KEY")
        assertNotNull("MAPS_API_KEY should not be null", apiKey)
        assertTrue("MAPS_API_KEY should not be empty", apiKey.isNotEmpty())
    }
}