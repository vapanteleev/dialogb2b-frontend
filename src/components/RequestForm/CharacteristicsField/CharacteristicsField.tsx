import React from 'react'
import styles from '../RequestForm.module.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
export interface ICharacteristicsFieldProps {
  setFormData: () => void
}
function CharacteristicsField(props: ICharacteristicsFieldProps) {
  return (
    <div>
      <Button>Добавить характеристику</Button>
      <div className={`${styles.inputWrapper} ${styles.CharacteristicsField}`}>

        <TextField
          placeholder='Название характеристики'
          variant='standard'

          name="characteristics"
          // value={formData.characteristics}
          // onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputWrapper}>

        <TextField
          placeholder='Значение характеристики'
          name="characteristics"
          // value={formData.characteristics}
          // onChange={handleChange}
          required
          multiline
        />
      </div>

    </div>
  )
}

export default CharacteristicsField