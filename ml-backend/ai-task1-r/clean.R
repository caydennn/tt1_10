library(tidyverse)
library(GGally)
library(this.path)
data_raw <- read_csv(here("cleanprofile_start.csv"))
data_input <- read_csv(here('inputdata.csv'))

data_restruct <- data_raw %>%
  separate(Address, c('AddressFrag', 'PostalCode'), ' Singapore ', remove = F) %>%
  separate(AddressFrag, c('AddressFrag', 'UnitNumber'), ' #') %>%
  separate(AddressFrag, c('Block', 'StreetName'), 9) %>%
  mutate(HighNetWorthIndividual = ifelse(MonthlyIncome > 8000, 'Yes', 'No'))

View(data_restruct)